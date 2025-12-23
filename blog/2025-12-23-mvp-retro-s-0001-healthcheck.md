---
slug: mvp-retro-s-0001-healthcheck
title: DocOps+AgentOps MVP 复盘：S-0001 healthcheck 闭环跑通
authors: [sou350121]
tags: [mvp, docops, agentops, workflow, prompt-vcs]
---

这次 MVP 的目标很简单：用一个最小但真实的功能交付，跑通 Hybrid SSOT 的证据链。

## 结果（Done）
- Issue（索引）：本地 `issues/ISSUE-0001.md`（后续可复制到 GitHub Issue）
- SSOT 文档：`stories/` + `prompts/` + `sessions/` + `docs/features/`
- 工程交付：`src/` + `tests/`，并通过 `pytest`
- 自动化：GitHub Actions 工作流 `CI`（DocOps validate + pytest）

<!-- truncate -->

## 关键收获
- **Issue 不需要承载正文**：它只要能跳到 canonical story，就不会断链。
- **Prompt/失败路径入库后，复现成本骤降**：未来重跑同一故事，不靠记忆，靠文件。
- **最小 CI 足够**：先守住证据链与测试，再谈更复杂的质量门禁。

## 下一步
- 把仓库推到 GitHub，真正创建 Issue/PR，跑一次“线上协作版”的闭环。
- 增加一个 S-0002：把 observability/runbook 也跑一遍（例如错误注入与回滚演练）。
