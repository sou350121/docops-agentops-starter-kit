# S-0003-pm-architect-scope-guardrails

## 目标
为「需求 Agent（PM/架构师）」提供一套**最小但强约束**的 guardrails，防止上下文溢出/发散导致做出 roadmap 以外的东西；并提供可复制的 PM-only 模板，让团队能在多 agent/多角色协作时不断链、不跑偏。

## 验收标准（必须可验证）
- [ ] `README.md` 增加「需求 Agent（PM/架构师）scope guardrails」：明确允许/禁止、扩范围必须先问、上下文溢出降级流程，并提供可复制模板。
- [ ] `runbooks/AGENT_BOOTSTRAP_DOCOPS_AGENTOPS.md` 增加同样的 guardrails（SOP 版），包含“context overflow fallback”。
- [ ] `scripts/validate-docops` 校验通过（Story/Prompt/Failures/Ledger 齐全）。
- [ ] `docs/features/S-0003-pm-architect-scope-guardrails/status.md` 填好变更摘要与验证命令。

## 范围 / 非目标
- 范围：仅文档与流程约束（README + runbook + evidence chain），不引入新框架/不做大改。
- 非目标：不实现自动化的“roadmap 检查器”；不强制所有项目必须有 roadmap 文件（若存在则引用）。

## 任务拆分
- [ ] 更新 README：新增 PM/Architect guardrails + 模板（放在“角色分工闭环”的 PM 段落附近）。
- [ ] 更新 runbook：新增 PM/Architect guardrails + context overflow fallback。
- [ ] 更新 Prompt VCS：`prompts/S-0003-pm-architect-scope-guardrails.md`（记录关键约束/决策）。
- [ ] 更新 ledger：`docs/features/S-0003-pm-architect-scope-guardrails/status.md`（变更摘要 + 验证命令）。

## 关联文件（计划/实际）
- `README.md`
- `runbooks/AGENT_BOOTSTRAP_DOCOPS_AGENTOPS.md`
- `stories/S-0003-pm-architect-scope-guardrails.md`
- `prompts/S-0003-pm-architect-scope-guardrails.md`
- `sessions/S-0003-pm-architect-scope-guardrails/failures.md`
- `docs/features/S-0003-pm-architect-scope-guardrails/status.md`

## 进度日志（每次 Agent session 追加）
- 2025-12-23: 初始化
- 2025-12-23: 补齐 guardrails 文档（README+runbook）与证据链（prompt/status），验证通过
