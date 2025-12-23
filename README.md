# DocOps + AgentOps Starter Kit

这是一套可复制到任意工程仓库的 **Hybrid DocOps（Repo 为正文）+ AgentOps（多角色闭环）** 脚手架。

### 簡單（推薦）：只用一份 Markdown 就讓 agent 自動跑起來

把這個 GitHub repo link 丟給 agent，並在 chat 說「先讀它再開始做事」即可：
- Repo：`https://github.com/sou350121/docops-agentops-starter-kit`
- Runbook：`runbooks/AGENT_BOOTSTRAP_DOCOPS_AGENTOPS.md`

## 新手上手：把這套用到你自己的專案（只知道 GitHub 連結也可以）

> 目标：你有自己的项目 repo（可能是空的/已有代码），你想把这套 **DocOps + AgentOps 证据链闭环**搬进去。

### 1) 把本套件放进你的 repo（最小拷贝）
- 把以下目录/文件复制到**你的项目根目录**（允许按需删减，但建议先全量带上）：
  - `stories/`
  - `prompts/`
  - `sessions/`
  - `docs/features/`
  - `issues/`
  - `scripts/`
  - `runbooks/`
  - `.cursor/`（推荐：让 Cursor agent 默认遵守证据链规则）
- （可选）启用 CI：
  - 复制 `.github/workflows/docops-validation.yml` 到你的 repo

### 2) 在你的 repo 里生成第一个 story 骨架
- Windows（PowerShell）：
  - `pwsh -NoProfile -File scripts/new-story.ps1 -Id S-0001 -Title add-login`
- Bash/CI：
  - `bash scripts/new-story.sh S-0001 add-login`

### 3) 让 agent 开始干活（复制贴上这一段）

> 把下面模板中的 `<YOUR_REPO>` 换成你的项目地址或本地路径，`<STORY_ID>`/`<TITLE>` 换成你的 story。

```markdown
你是工程交付型代理，请严格按 DocOps+AgentOps SOP 执行，不要扩大范围。

请先阅读并遵守：`runbooks/AGENT_BOOTSTRAP_DOCOPS_AGENTOPS.md`

我的项目：<YOUR_REPO>
目标 Story：stories/<STORY_ID>-<TITLE>.md

要求：
1) 以 Story 为 SSOT：逐条对齐验收标准实现（只改动允许目录）
2) 证据链必须闭环并回填：
   - prompts/<STORY_ID>-<TITLE>.md
   - docs/features/<STORY_ID>-<TITLE>/status.md
   - sessions/<STORY_ID>-<TITLE>/failures.md（只有真的失败/偏航才写）
3) 必须提供可复制的验证命令（至少）：
   - pytest
   - scripts/validate-docops（Windows + CI/Linux）
4) 不要写入任何 token/密钥；不引入重型框架；不做大规模重构
```

## 最簡單可操作：角色分工閉環（PM/架构师 → Coder → Reviewer）

核心原則：**三個角色都在同一個 story 下工作**，並且**回填到同一套證據鏈**：
`stories/<id>.md` + `prompts/<id>.md` +（必要時）`sessions/<id>/failures.md` + `docs/features/<id>/status.md`

> 你只要把下面三段依序貼給 agent（可同一個 agent 分三輪，也可三個 agent），把 `<ID>`/`<TITLE>` 換成你的 story。

### 1) PM/架构师（定需求 + 验收）

```markdown
你现在扮演 PM/架构师。

先读 `runbooks/AGENT_BOOTSTRAP_DOCOPS_AGENTOPS.md` 并遵守。

目标 Story：stories/<ID>-<TITLE>.md

任务：
1) 把 story 补完整：目标、范围/非目标、验收标准（必须可验证）、任务拆分、关联文件
2) 如需架构决策，写到 `docs/features/<ID>-<TITLE>/decisions.md`（若无则创建）
3) 更新 `prompts/<ID>-<TITLE>.md`，追加小节：`### Agent: PM/Architect / <date>`，记录关键决策与约束
输出：告诉我下一步 coder 该实现哪些文件/验收点。
```

### 2) Coder（写代码 + 测试 + ledger）

```markdown
你现在扮演 Coder。

严格按 `stories/<ID>-<TITLE>.md` 的验收标准实现，不扩大范围。

任务：
1) 在 `src/` 实现每条验收点
2) 在 `tests/` 补测试，确保 `pytest` 通过
3) 更新 `docs/features/<ID>-<TITLE>/status.md`：变更摘要 + 可复制验证命令
4) 更新 `prompts/<ID>-<TITLE>.md` 追加：`### Agent: Coder / <date>`（你做了什么、关键实现点）
输出：文件清单 + 验证命令（pytest + validate-docops）。
```

### 3) Reviewer（对照验收 + 风险/回滚）

```markdown
你现在扮演 Reviewer。

任务：
1) 对照 `stories/<ID>-<TITLE>.md` 验收标准逐条检查：是否真的可验证
2) 检查证据链是否完整：story/prompt/failures/status 是否齐全且互相引用
3) 提出风险点与回滚方案（必要时写入 `docs/features/<ID>-<TITLE>/status.md` 或 `decisions.md`）
4) 更新 `prompts/<ID>-<TITLE>.md` 追加：`### Agent: Reviewer / <date>`（审查结论与建议）
输出：通过/不通过 + 需要修的点 + 最终验证命令。
```

### 4) 你自己怎么验证“真的跑通了”
- `pytest`
- Windows：`pwsh -NoProfile -File scripts/validate-docops.ps1`
- CI/Linux：`bash scripts/validate-docops.sh`

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
