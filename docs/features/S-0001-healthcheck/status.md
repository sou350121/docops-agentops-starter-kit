# S-0001-healthcheck 状态

- 状态：完成
- Story：
  - stories/S-0001-healthcheck.md
- Prompt：
  - prompts/S-0001-healthcheck.md
- Failures：
  - sessions/S-0001-healthcheck/failures.md
- Issue（索引占位）：
  - issues/ISSUE-0001.md
- PR：
  - （可选：若需要演示 PR，可在 GitHub 上用 S-0002 再跑一轮；本 MVP 先以 main 合入为准）

## 变更摘要
- 新增 `health_payload()`，提供可序列化健康信息。
- 增强测试覆盖。

## 验证
- `python -m pip install pytest`
- `pytest`
- `pwsh -NoProfile -File scripts/validate-docops.ps1`（Windows）
- `bash scripts/validate-docops.sh`（CI/Linux）
