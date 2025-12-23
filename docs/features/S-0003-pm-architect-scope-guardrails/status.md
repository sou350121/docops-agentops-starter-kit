# S-0003-pm-architect-scope-guardrails 状态

- 状态：完成
- Story：
  - stories/S-0003-pm-architect-scope-guardrails.md
- Prompt：
  - prompts/S-0003-pm-architect-scope-guardrails.md
- Failures：
  - sessions/S-0003-pm-architect-scope-guardrails/failures.md
- PR：

## 变更摘要
- README：在“角色分工闭环”的 PM/Architect 段落加入 scope guardrails（只认 SSOT、只做澄清/方案/拆分、扩范围先问、context overflow fallback）。
- README：新增顶部 hero banner 图片（用于快速理解 DocOps+AgentOps 闭环结构）。
- Runbook：加入 SOP 级别的 PM/Architect scope guardrails（同上）。

## 验证
- `pytest`
- `pwsh -NoProfile -File scripts/validate-docops.ps1`
