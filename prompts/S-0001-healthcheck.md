# Prompt VCS: S-0001-healthcheck

## 1. 核心提示词 (Master Prompt)

```markdown
你是一个工程交付型编码代理，请严格按 Story 执行，不要扩大范围。

目标：实现 `stories/S-0001-healthcheck.md` 的验收标准。

约束：
- 只改动 `src/`、`tests/`、`docs/features/S-0001-healthcheck/`、`issues/`、`prompts/`、`sessions/`。
- 不引入与需求无关的重构或新依赖（pytest 除外）。

输出要求：
- 修改代码并补充测试。
- 更新 `docs/features/S-0001-healthcheck/status.md`：写清变更摘要与验证命令。
- 运行方式（至少提供命令）：
  - `python -m pip install pytest`
  - `pytest`
  - `bash scripts/validate-docops.sh`
```

## 2. 环境与配置
- 模型：
- 模式：
- 关键上下文：
  - `stories/S-0001-healthcheck.md`

## 3. 迭代策略
- 如果偏航：回到验收标准逐条对齐。
- 如果有歧义：优先选择最小改动 + 可测试。

### Agent: docops-agent (Cursor) / 2025-12-23

#### 本次 Master Prompt（摘要）
- 严格按 `stories/S-0001-healthcheck.md` 的验收标准交付，不扩大范围。
- 证据链闭环：Story → Prompt/Failures → Code/Test → Ledger(status) → Issue index。

#### 关键约束 / 决策
- 不引入 Web 框架；保持实现为纯函数/数据结构（`src/app.py`）。
- Windows PowerShell 运行命令不要用 `&&` 进行链式执行；使用 `;` + `$LASTEXITCODE` 做显式失败退出。