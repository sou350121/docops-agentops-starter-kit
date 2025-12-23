# Prompt VCS: S-0003-pm-architect-scope-guardrails

## 1. 核心提示词 (Master Prompt)
```markdown
你是工程交付型编码代理，请严格按 `stories/S-0003-pm-architect-scope-guardrails.md` 的验收标准执行，不要扩大范围。

目标：在本 repo 的 onboarding 文档中加入“需求 Agent（PM/架构师）scope guardrails”，解决：PM/架构师 agent 因上下文溢出/不确定而做出 roadmap 以外的东西。

约束：
- 只改动允许目录（`README.md`、`runbooks/`、`stories/`、`prompts/`、`sessions/`、`docs/features/`）。
- 不引入新框架/不做大重构；只做文档与证据链回填。

你必须做到：
1) 更新 `README.md`：在“角色分工闭环”的 PM/Architect 段落加入 guardrails + 可复制模板，强调：
   - 只认 SSOT（story/decisions）
   - 只能做澄清/方案/拆分
   - 扩范围必须先问（范围变更请求）
   - context overflow fallback（先外化写回 story，再停手）
2) 更新 `runbooks/AGENT_BOOTSTRAP_DOCOPS_AGENTOPS.md`：加入 SOP 级 guardrails（同上）。
3) 更新 `docs/features/S-0003-pm-architect-scope-guardrails/status.md`：变更摘要 + 验证命令。
4) 证据链完整：`prompts/` + `sessions/` + `docs/features/`，并通过 `scripts/validate-docops`。
5) 提供可复制验证命令：`pytest` + `pwsh -NoProfile -File scripts/validate-docops.ps1`
```

## 2. 环境与配置
- 模型：
- 模式：

## 3. 迭代策略
- 如果偏航：回到验收标准逐条对齐。

### Agent: docops-agent (Cursor) / 2025-12-23

#### 关键决策
- Guardrails 要放在用户最常复制的地方（README 的 PM/Architect 模板附近），避免“写在深处没人看”。
- 用显式的“范围变更请求 + 必须先问”机制来阻断 roadmap drift。
- 提供 context overflow fallback：先把共识外化写回 SSOT，再输出给 coder 的任务清单并停止发散。
- README 顶部增加 hero banner，降低新手理解成本（一眼看懂 SSOT→证据链→多角色闭环）。
