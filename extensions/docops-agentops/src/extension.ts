import * as vscode from "vscode";
import { exec } from "node:child_process";

type EvidenceChain = {
  base: string; // e.g. S-0001-healthcheck
  story: vscode.Uri;
  prompt: vscode.Uri;
  failures: vscode.Uri;
  status: vscode.Uri;
};

function workspaceRoot(): vscode.Uri {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    throw new Error("No workspace folder is open.");
  }
  return folders[0].uri;
}

function fileBasenameNoExt(uri: vscode.Uri): string {
  const parts = uri.path.split("/");
  const filename = parts[parts.length - 1] ?? "";
  return filename.endsWith(".md") ? filename.slice(0, -3) : filename;
}

async function ensureDir(dir: vscode.Uri): Promise<void> {
  await vscode.workspace.fs.createDirectory(dir);
}

async function writeFileIfMissing(file: vscode.Uri, contents: string): Promise<void> {
  try {
    await vscode.workspace.fs.stat(file);
    // exists -> do nothing
  } catch {
    await vscode.workspace.fs.writeFile(file, Buffer.from(contents, "utf8"));
  }
}

function storyTemplate(id: string, title: string): string {
  const full = `${id}-${title}`;
  const today = new Date().toISOString().slice(0, 10);
  return `# ${full}

## 目标

## 验收标准（必须可验证）
- [ ]

## 范围 / 非目标

## 任务拆分
- [ ]

## 关联文件（计划/实际）
- 

## 进度日志（每次 Agent session 追加）
- ${today}: 初始化
`;
}

function promptTemplate(id: string, title: string): string {
  const full = `${id}-${title}`;
  return `# Prompt VCS: ${full}

## 1. 核心提示词 (Master Prompt)

\`\`\`markdown
目标：实现 ${full}。
约束：只改动允许目录；不要引入与需求无关的重构。
输出：必须提供验证命令，并在 PR description 回填 story/prompt/failures 链接。
\`\`\`

## 2. 环境与配置
- 模型：
- 模式：

## 3. 迭代策略
- 如果偏航：回到验收标准逐条对齐。
`;
}

function failuresTemplate(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `# 失败路径记录 (Failure Log)

## 尝试 #1
- 日期：${today}
- 现象：
- 根因分析：
- 教训/对策：
`;
}

function statusTemplate(id: string, title: string): string {
  const full = `${id}-${title}`;
  return `# ${full} 状态

- 状态：进行中
- Story：
  - stories/${full}.md
- Prompt：
  - prompts/${full}.md
- Failures：
  - sessions/${full}/failures.md
- PR：

## 变更摘要

## 验证
`;
}

async function pickStoryBase(): Promise<string | undefined> {
  const stories = await vscode.workspace.findFiles("stories/*.md");
  if (stories.length === 0) {
    vscode.window.showWarningMessage("No stories found under stories/*.md");
    return undefined;
  }

  const items = stories
    .map((u) => fileBasenameNoExt(u))
    .sort((a, b) => a.localeCompare(b))
    .map((base) => ({ label: base }));

  const picked = await vscode.window.showQuickPick(items, {
    title: "Select a Story",
    placeHolder: "stories/S-xxxx-*.md",
    canPickMany: false
  });

  return picked?.label;
}

function evidenceChainForBase(base: string, root: vscode.Uri): EvidenceChain {
  return {
    base,
    story: vscode.Uri.joinPath(root, "stories", `${base}.md`),
    prompt: vscode.Uri.joinPath(root, "prompts", `${base}.md`),
    failures: vscode.Uri.joinPath(root, "sessions", base, "failures.md"),
    status: vscode.Uri.joinPath(root, "docs", "features", base, "status.md")
  };
}

async function openChain(chain: EvidenceChain): Promise<void> {
  const open = async (uri: vscode.Uri, viewColumn?: vscode.ViewColumn) => {
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc, { preview: false, viewColumn });
  };

  await open(chain.story, vscode.ViewColumn.One);
  await open(chain.prompt, vscode.ViewColumn.Beside);
  await open(chain.status, vscode.ViewColumn.Beside);
  await open(chain.failures, vscode.ViewColumn.Beside);
}

function extractFirstFencedBlock(markdown: string): string | undefined {
  // Finds first triple-backtick block.
  const match = markdown.match(/```[\w-]*\r?\n([\s\S]*?)\r?\n```/);
  return match?.[0];
}

async function readText(uri: vscode.Uri): Promise<string> {
  const bytes = await vscode.workspace.fs.readFile(uri);
  return Buffer.from(bytes).toString("utf8");
}

function runCommandInWorkspace(command: string, cwd: string, output: vscode.OutputChannel): Promise<number> {
  return new Promise((resolve) => {
    const child = exec(command, { cwd, windowsHide: true }, (error, stdout, stderr) => {
      if (stdout) output.appendLine(stdout.trimEnd());
      if (stderr) output.appendLine(stderr.trimEnd());
      resolve(error ? (typeof error.code === "number" ? error.code : 1) : 0);
    });
    child.stdout?.on("data", (d) => output.append(d.toString()));
    child.stderr?.on("data", (d) => output.append(d.toString()));
  });
}

export function activate(context: vscode.ExtensionContext) {
  const output = vscode.window.createOutputChannel("DocOps");

  context.subscriptions.push(
    vscode.commands.registerCommand("docops.newStory", async () => {
      try {
        const id = await vscode.window.showInputBox({
          title: "New Story",
          prompt: "Story ID (e.g. S-0002)",
          validateInput: (v) => (!v.trim() ? "Required" : undefined)
        });
        if (!id) return;

        const title = await vscode.window.showInputBox({
          title: "New Story",
          prompt: "Title (e.g. add-login)",
          validateInput: (v) => (!v.trim() ? "Required" : undefined)
        });
        if (!title) return;

        const base = `${id.trim()}-${title.trim()}`;
        const root = workspaceRoot();

        const story = vscode.Uri.joinPath(root, "stories", `${base}.md`);
        const prompt = vscode.Uri.joinPath(root, "prompts", `${base}.md`);
        const sessionDir = vscode.Uri.joinPath(root, "sessions", base);
        const featureDir = vscode.Uri.joinPath(root, "docs", "features", base);
        const screenshotsDir = vscode.Uri.joinPath(featureDir, "screenshots");

        await ensureDir(vscode.Uri.joinPath(root, "stories"));
        await ensureDir(vscode.Uri.joinPath(root, "prompts"));
        await ensureDir(sessionDir);
        await ensureDir(featureDir);
        await ensureDir(screenshotsDir);

        await writeFileIfMissing(story, storyTemplate(id.trim(), title.trim()));
        await writeFileIfMissing(prompt, promptTemplate(id.trim(), title.trim()));
        await writeFileIfMissing(vscode.Uri.joinPath(sessionDir, "failures.md"), failuresTemplate());
        await writeFileIfMissing(vscode.Uri.joinPath(featureDir, "status.md"), statusTemplate(id.trim(), title.trim()));

        const chain = evidenceChainForBase(base, root);
        await openChain(chain);

        await vscode.env.clipboard.writeText(chain.base);
        vscode.window.showInformationMessage(`Created evidence chain for ${base}. (Story base copied to clipboard)`);
      } catch (e) {
        vscode.window.showErrorMessage(`DocOps: New Story failed: ${e instanceof Error ? e.message : String(e)}`);
      }
    }),

    vscode.commands.registerCommand("docops.openEvidenceChain", async () => {
      try {
        const base = await pickStoryBase();
        if (!base) return;
        const chain = evidenceChainForBase(base, workspaceRoot());
        await openChain(chain);
      } catch (e) {
        vscode.window.showErrorMessage(`DocOps: Open Evidence Chain failed: ${e instanceof Error ? e.message : String(e)}`);
      }
    }),

    vscode.commands.registerCommand("docops.copyMasterPrompt", async () => {
      try {
        const base = await pickStoryBase();
        if (!base) return;
        const chain = evidenceChainForBase(base, workspaceRoot());

        const promptText = await readText(chain.prompt);
        const fenced = extractFirstFencedBlock(promptText);
        if (!fenced) {
          vscode.window.showWarningMessage("No fenced code block found in the prompt file. Copied the entire file instead.");
          await vscode.env.clipboard.writeText(promptText);
          return;
        }

        await vscode.env.clipboard.writeText(fenced);
        vscode.window.showInformationMessage(`Copied master prompt block for ${base} to clipboard.`);
      } catch (e) {
        vscode.window.showErrorMessage(`DocOps: Copy Master Prompt failed: ${e instanceof Error ? e.message : String(e)}`);
      }
    }),

    vscode.commands.registerCommand("docops.validateEvidenceChain", async () => {
      try {
        const root = workspaceRoot();
        output.clear();
        output.show(true);

        const cwd = root.fsPath;
        const isWindows = process.platform === "win32";
        const cmd = isWindows
          ? `pwsh -NoProfile -File scripts/validate-docops.ps1`
          : `bash scripts/validate-docops.sh`;

        output.appendLine(`$ ${cmd}`);
        const code = await runCommandInWorkspace(cmd, cwd, output);
        if (code === 0) {
          vscode.window.showInformationMessage("DocOps evidence chain: OK");
        } else {
          vscode.window.showErrorMessage(`DocOps evidence chain: FAILED (exit ${code}). See 'DocOps' output.`);
        }
      } catch (e) {
        vscode.window.showErrorMessage(`DocOps: Validate Evidence Chain failed: ${e instanceof Error ? e.message : String(e)}`);
      }
    })
  );
}

export function deactivate() {}


