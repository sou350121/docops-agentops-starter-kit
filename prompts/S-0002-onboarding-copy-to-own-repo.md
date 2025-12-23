# Prompt VCS: S-0002-onboarding-copy-to-own-repo

## 1. 核心提示词 (Master Prompt)
```markdown
你是工程交付型编码代理，请严格按 `stories/S-0002-onboarding-copy-to-own-repo.md` 的验收标准执行，不要扩大范围。

目标：更新本仓库的 onboarding 文档，让一个“只知道 GitHub 链接的小白”也能把 DocOps+AgentOps 套用到自己的项目。

约束：
- 只改动允许目录（`runbooks/`、`README.md`、`stories/`、`prompts/`、`sessions/`、`docs/features/`、`scripts/`）。
- 不引入重型框架/不做大规模重构；只做最小可用的文档与脚本修复。

你必须做到：
1) 更新 `README.md`：加入“把这套复制到你自己的 repo”的最小步骤 + 一段可直接贴给 agent 的消息模板。
2) 更新 `runbooks/AGENT_BOOTSTRAP_DOCOPS_AGENTOPS.md`：加入同样的 onboarding 流程（更详细的 SOP 版本）。
3) 修复 `scripts/new-story.ps1` 生成的 Prompt VCS 模板 fenced code block（应输出 ```markdown ... ```，不能变成单个反引号）。
4) 回填证据链：
   - 更新 `prompts/S-0002-onboarding-copy-to-own-repo.md`（追加本次 agent 小节）
   - 更新 `docs/features/S-0002-onboarding-copy-to-own-repo/status.md`（变更摘要 + 验证命令）
5) 提供可复制验证命令：`pwsh -NoProfile -File scripts/validate-docops.ps1`
```

## 2. 环境与配置
- 模型：
- 模式：

## 3. 迭代策略
- 如果偏航：回到验收标准逐条对齐。

### Agent: docops-agent (Cursor) / 2025-12-23

#### 关键决策
- 把“新手如何套用到自己项目”的说明同时放进 `README.md`（快速入口）和 runbook（完整 SOP）。
- 修复 `scripts/new-story.ps1` 的 fenced code block 输出：PowerShell 双引号 here-string 会把 backtick 当转义，需对 backticks 做转义以输出三连反引号。
- README 补上最简可复制的“角色分工闭环”模板（PM/Architect → Coder → Reviewer），让团队能用同一套证据链做分工协作。
- 将“角色分工闭环”章节前置到 README 顶部（紧跟 repo link/runbook），让新手更快找到可操作入口。
