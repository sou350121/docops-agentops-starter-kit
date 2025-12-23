# DocOps + AgentOps Starter Kit

这是一套可复制到任意工程仓库的 **Hybrid DocOps（Repo 为正文）+ AgentOps（多角色闭环）** 脚手架。

### 更簡單（推薦）：只用一份 Markdown 就讓 agent 自動跑起來

把這份文件丟給 agent，並在 chat 說「先讀它再開始做事」即可：
- `runbooks/AGENT_BOOTSTRAP_DOCOPS_AGENTOPS.md`

## 快速开始

1) 复制本目录到你的项目根目录（或手动拷贝其中的文件结构）。

2) 先填这三份“源文档”：
- `AGENT_CONSTITUTION.md`
- `roadmap.md`
- `stories/S-0001-example.md`（复制改名，作为你的第一个需求单元）

3) 开始工作：
- 用 Issue 做索引/协作，看板管理
- 用 Repo 文档做 SSOT
- 用 PR 看 diff/review/CI

## 关键规则（别跳过）

- Issue 仅做索引，不做正文：Issue 必须链接 `stories/S-xxxx.md`（canonical）。
- PR 必须回填证据链：story +（prompt 或 failures）+ verification。
- 讨论可以在 Issue/PR，但关键结论必须回写 `stories/` 或 `docs/features/.../decisions.md`。

## 一键生成 Story 骨架

- PowerShell：`scripts/new-story.ps1 -Id S-0002 -Title "add-login"`
- Bash：`scripts/new-story.sh S-0002 add-login`

## 校验（可选但强烈建议）

`./scripts/validate-docops.sh` 或 `./scripts/validate-docops.ps1`

并将 `.github/workflows/docops-validation.yml` 复制到你的仓库根目录以启用 CI。

## Cursor / 多 Agent 对话怎么“自动做到” DocOps + AgentOps

这个 repo 提供两层能力：

- **Project Rules（推荐）**：`.cursor/rules/docops-agentops.mdc`
  - 作用：让每次 Cursor agent / 多 agent 的交付，都自动遵守“证据链必须回填”的规则（Story/Prompt/Failures/Ledger）。
- **插件（VS Code/Cursor extension）**：`extensions/docops-agentops/`
  - 作用：在 Command Palette 里一键生成/打开证据链，复制 Master Prompt 直接贴到 chat，并一键跑 `validate-docops`。

### 插件命令

在命令面板搜索 `DocOps:`：
- `DocOps: New Story (create evidence chain)`
- `DocOps: Open Evidence Chain (story/prompt/status/failures)`
- `DocOps: Copy Master Prompt to Clipboard`
- `DocOps: Validate Evidence Chain`

### 本地安装插件（VSIX）

```bash
cd extensions/docops-agentops
npm install
npm run compile
npm run package
```

然后在 Cursor/VS Code 里用 **Install from VSIX...** 安装生成的 `.vsix`。
