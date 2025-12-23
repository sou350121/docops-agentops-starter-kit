# Issue 0001 (Index Only): S-0001-healthcheck

> 说明：本文件是 GitHub Issue 的离线占位（因为当前未创建远程仓库）。
> 远程仓库创建后，把这段内容粘贴到 GitHub Issue，即可满足 Hybrid SSOT 的“索引层”。

## Canonical Story (SSOT)
- `stories/S-0001-healthcheck.md`

## TL;DR
实现最小健康检查能力，并跑通 DocOps+AgentOps 的证据链与 CI。

## Acceptance (high-level)
- `health_payload()` 可返回 `{ "status": "ok" }`
- `pytest` 通过
- DocOps 校验通过：
  - Windows：`pwsh -NoProfile -File scripts/validate-docops.ps1`
  - CI/Linux：`bash scripts/validate-docops.sh`

## Status
- In Progress

## Links
- Prompt: `prompts/S-0001-healthcheck.md`
- Failures: `sessions/S-0001-healthcheck/failures.md`
- Ledger: `docs/features/S-0001-healthcheck/status.md`
