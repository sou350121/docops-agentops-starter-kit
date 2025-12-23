# DocOps + AgentOps (Cursor/VS Code extension)

这个扩展提供“插件式”工作流，帮助你在和 Cursor agent / 多 agent 协作时，维持 DocOps + AgentOps 的证据链闭环：

- 一键生成 Story + Prompt + Failures + Status（证据链骨架）
- 一键打开证据链文件
- 一键复制 Master Prompt（直接粘贴到 agent chat）
- 一键跑证据链校验（`validate-docops`）

## Commands

在 Command Palette 中搜索 `DocOps:`：

- `DocOps: New Story (create evidence chain)`
- `DocOps: Open Evidence Chain (story/prompt/status/failures)`
- `DocOps: Copy Master Prompt to Clipboard`
- `DocOps: Validate Evidence Chain`

## Install (local)

### Option A: build VSIX and install

在仓库根目录：

```bash
cd extensions/docops-agentops
npm install
npm run compile
npm run package
```

然后在 Cursor/VS Code 里使用 **Install from VSIX...** 安装生成的 `.vsix` 文件。

### Option B: run in development host (VS Code)

用 VS Code 打开 `extensions/docops-agentops/`，按 `F5`（Run Extension）在 Extension Development Host 里测试。

## Notes / limitations

- 扩展 **无法直接读取 Cursor chat 内容**（Cursor 的 chat UI 不是标准 VS Code API 暴露的 editor 文本）。
- 所以我们用 “Copy Master Prompt” 来把 `prompts/<story>.md` 里的 fenced block 复制到剪贴板，你直接粘贴进 chat 即可。


