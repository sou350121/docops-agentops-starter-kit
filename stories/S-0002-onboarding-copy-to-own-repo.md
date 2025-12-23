# S-0002-onboarding-copy-to-own-repo

## 目标
让一个“只知道本仓库 GitHub 地址”的新用户，能用最小步骤把 DocOps + AgentOps（Hybrid SSOT）套用到自己的项目，并且知道如何对 agent 下指令与如何验证闭环是否跑通。

## 验收标准（必须可验证）
- [ ] `README.md` 增加新手 onboarding：如何把本套件拷贝到自己的项目 + 一段可直接贴给 agent 的消息模板。
- [ ] `runbooks/AGENT_BOOTSTRAP_DOCOPS_AGENTOPS.md` 增加 “Apply to your own repo” 的 SOP（比 README 更细）。
- [ ] 修复 `scripts/new-story.ps1`：生成的 `prompts/<id>.md` 必须包含 fenced code block（```markdown ... ```），不能输出成单个反引号。
- [ ] `scripts/validate-docops` 校验通过（Story/Prompt/Failures/Ledger 齐全）。
- [ ] `docs/features/S-0002-onboarding-copy-to-own-repo/status.md` 填好变更摘要与验证命令。

## 范围 / 非目标
- 范围：只做文档与脚本的小改动，确保“只读一份 runbook 即可启动”并能扩展到用户自己的项目。
- 非目标：不实现新的业务功能；不引入 Web 框架；不强制要求安装扩展/插件（可选项即可）。

## 任务拆分
- [ ] 更新 README：增加新手路径 + agent 消息模板。
- [ ] 更新 runbook：增加“套用到自己的 repo” SOP + 常见坑（例如 PowerShell 不要用 `&&`）。
- [ ] 修复 `scripts/new-story.ps1` 的 fenced code block 输出。
- [ ] 更新 ledger：`docs/features/S-0002-onboarding-copy-to-own-repo/status.md`。
- [ ] 更新 prompt VCS：`prompts/S-0002-onboarding-copy-to-own-repo.md`。

## 关联文件（计划/实际）
- `README.md`
- `runbooks/AGENT_BOOTSTRAP_DOCOPS_AGENTOPS.md`
- `scripts/new-story.ps1`
- `stories/S-0002-onboarding-copy-to-own-repo.md`
- `prompts/S-0002-onboarding-copy-to-own-repo.md`
- `sessions/S-0002-onboarding-copy-to-own-repo/failures.md`
- `docs/features/S-0002-onboarding-copy-to-own-repo/status.md`

## 进度日志（每次 Agent session 追加）
- 2025-12-23: 初始化
- 2025-12-23: 更新 README + runbook（onboarding），修复 new-story.ps1 fenced code block，补齐证据链
