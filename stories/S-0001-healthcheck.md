# S-0001-healthcheck

## 目标
实现一个最小但真实的“健康检查”能力，用来验证 DocOps + AgentOps（Hybrid SSOT）闭环：Story/Prompt/Failures/Code/Tests/Ledger 的证据链能跑通。

## 验收标准（必须可验证）
- [ ] 新增 `health_payload()`，返回可序列化的健康信息（例如 `{ "status": "ok" }`）。
- [ ] `pytest` 通过。
- [ ] `scripts/validate-docops` 校验通过（Story/Prompt/Failures/Ledger 齐全）。
- [ ] `docs/features/S-0001-healthcheck/status.md` 填好变更摘要与验证命令。
- [ ] 提供 Issue 索引页（本地 `issues/ISSUE-0001.md`，后续用于在 GitHub 建 Issue）。

## 范围 / 非目标
- 范围：仅做最小功能与测试、文档证据链、CI（由仓库工作流负责）。
- 非目标：不引入 Web 框架、不做复杂配置管理、不做“真正部署”。

## 任务拆分
- [ ] 更新 `prompts/S-0001-healthcheck.md`（可复制的 Master Prompt）。
- [ ] 完成代码与测试：`src/app.py`、`tests/test_app.py`。
- [ ] 更新状态账本：`docs/features/S-0001-healthcheck/status.md`。
- [ ] 写 Issue 索引：`issues/ISSUE-0001.md`。

## 关联文件（计划/实际）
- `src/app.py`
- `tests/test_app.py`
- `docs/features/S-0001-healthcheck/status.md`
- `prompts/S-0001-healthcheck.md`
- `sessions/S-0001-healthcheck/failures.md`
- `issues/ISSUE-0001.md`

## 进度日志（每次 Agent session 追加）
- 2025-12-23: 初始化
