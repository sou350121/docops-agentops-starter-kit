# S-0001-healthcheck 状态

- 状态：进行中
- Story：
  - stories/S-0001-healthcheck.md
- Prompt：
  - prompts/S-0001-healthcheck.md
- Failures：
  - sessions/S-0001-healthcheck/failures.md
- Issue（索引占位）：
  - issues/ISSUE-0001.md
- PR：
  - （待创建：推送到 GitHub 后建立 PR，并在此回填链接）

## 变更摘要
- 新增 `health_payload()`，提供可序列化健康信息。
- 增强测试覆盖。

## 验证
- `python -m pip install pytest`
- `pytest`
- `pwsh -NoProfile -File scripts/validate-docops.ps1`（Windows）
- `bash scripts/validate-docops.sh`（CI/Linux）
