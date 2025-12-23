# 失败路径记录 (Failure Log)

## 尝试 #1
- 日期：2025-12-23
- 现象：在 PowerShell 里用 `python ... && pytest && pwsh ...` 会报解析错误，导致验证命令无法一键串行执行。
- 根因分析：当前执行环境的 PowerShell 不支持/未启用 `&&` 链式运算符解析（至少本 repo 的 agent 运行方式下如此）。
- 教训/对策：改用 PowerShell 原生命令分隔 `;`，并在每一步后检查 `$LASTEXITCODE`，确保失败时立即退出。
