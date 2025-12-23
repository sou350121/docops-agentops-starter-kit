# Agent Bootstrap: DocOps + AgentOps（把 repo + 這份文件丟給 agent 就能跑）

> 目的：讓任何 Cursor / 多 agent 在**只讀一份 Markdown**的情況下，就能在本 repo 內把 DocOps + AgentOps 的「證據鏈閉環」跑起來：  
> **Story（SSOT）→ Prompt/Failures → Code/Test → Ledger(status) →（可選）Issue/PR**  

---

## 0) 你要怎麼用（人類只做兩件事）

1. 把這個 repo（GitHub link 或本地 workspace）給 agent。
2. 在 chat 只說一句：
   - 「先讀 `runbooks/AGENT_BOOTSTRAP_DOCOPS_AGENTOPS.md`，之後所有輸出請嚴格照 SOP 跑。」

然後就讓 agent 自己做完：建/補齊證據鏈、對齊驗收、寫狀態帳本、給驗證命令。

---

## 1) 最小工作規則（必須遵守）

- **SSOT**：需求正文只認 `stories/S-xxxx-*.md`。
- **允許改動目錄**：`src/`, `tests/`, `stories/`, `prompts/`, `sessions/`, `docs/features/`, `issues/`, `.github/`, `scripts/`, `runbooks/`, `.cursor/`
- **禁止**：把任何 token/密鑰寫入 repo；未經授權不要引入重型框架/大改。
- **每次交付必須回填證據鏈**：
  - `prompts/<story>.md`：追加本次 session 的 master prompt/關鍵決策
  - `docs/features/<story>/status.md`：變更摘要 + 驗證命令（可複製執行）
  - `sessions/<story>/failures.md`：只有真的偏航/失敗/回滾/重大糾結才記（高信噪比）

---

## 2) 一鍵命令（agent 可以自行跑）

> 只要能跑其中一組即可（Windows/CI 皆可用）。

- **驗證證據鏈**：
  - Windows：`pwsh -NoProfile -File scripts/validate-docops.ps1`
  - Bash/CI：`bash scripts/validate-docops.sh`
- **跑測試**：
  - `python -m pip install pytest`
  - `pytest`
- **新建 story 骨架**（推薦，會自動建好證據鏈檔案）：
  - Windows：`pwsh -NoProfile -File scripts/new-story.ps1 -Id S-0002 -Title add-login`
  - Bash：`bash scripts/new-story.sh S-0002 add-login`

---

## 3) Master Prompt（直接貼到 Cursor chat）

### A) 新 Story（從 0 開始）

```markdown
你是工程交付型代理，請嚴格按 DocOps+AgentOps SOP 執行，不要擴大範圍。

目標：在此 repo 內完成一個 Story 的交付閉環。

你必須先做「Bootstrap」：
1) 列出你要做的目標 story 檔案：stories/S-xxxx-*.md（若使用者未給 id，請先詢問；不要自創）
2) 若證據鏈檔案不存在，請用腳本建立：
   - Windows: pwsh -NoProfile -File scripts/new-story.ps1 -Id <ID> -Title <kebab-title>
   - Bash: bash scripts/new-story.sh <ID> <kebab-title>
   證據鏈包含：prompts/<story>.md、sessions/<story>/failures.md、docs/features/<story>/status.md
3) 讀取 story，逐條對齊「驗收標準」並實作：只改動允許目錄，不引入重型框架/大重構。
4) 補測試（tests/），確保 pytest 會過。
5) 更新 prompts/<story>.md：追加一段「### Agent: <name/role> / <date>」並記錄本次 master prompt/關鍵決策/關鍵約束。
6) 更新 docs/features/<story>/status.md：寫清變更摘要 + 完整驗證命令（至少 pytest + validate-docops）
7) 只有發生偏航/失敗/回滾/重大糾結時才更新 sessions/<story>/failures.md（保持高信噪比）。
8) 最後輸出：完成狀態 + 涉及的檔案清單 + 可複製執行的驗證命令。
```

### B) 延續既有 Story（你只要做這次變更）

```markdown
你是工程交付型代理，請嚴格按 stories/<id>.md 的驗收標準執行，不要擴大範圍。

請先做：
1) 讀 stories/<id>.md，列出每條驗收標準的對應實作點
2) 確認證據鏈齊全：prompts/<id>.md、sessions/<id>/failures.md、docs/features/<id>/status.md
3) 若缺檔，補齊（可用 scripts/new-story.* 或手動補同名路徑）

實作時：
- 只改動允許目錄
- 每做一個驗收點就同步更新測試與 status.md 的變更摘要（避免漏）

結尾必須提供可複製的驗證命令：pytest + validate-docops。
```

### C) 多 Agent 分工（同一個 Story，避免斷鏈）

```markdown
你是多代理協作中的其中一個 agent。你只能在同一個 canonical story 下工作：stories/<id>.md。

協作規則：
1) 你只負責 story 任務拆分中的一段（先說清楚你負責哪一段）
2) 你所有改動都要回填到同一套證據鏈：
   - prompts/<id>.md：用小節追加「### Agent: <role/name> / <date>」記錄你做了什麼與關鍵決策
   - docs/features/<id>/status.md：在變更摘要追加你做的部分，並補充你新增/更新的驗證命令（如有）
3) 若你遇到偏航/失敗路徑，才在 sessions/<id>/failures.md 新增「嘗試 #n」
4) 任何與驗收/範圍相關的結論，必須回寫到 story 或 docs/features/<id>/decisions.md（若存在）
```

---

## 4) Agent 交付檢查清單（最後一分鐘自查）

- [ ] 我明確指出了 canonical story：`stories/<id>.md`
- [ ] 我逐條對齊 story 的驗收標準（每條都有對應變更或理由）
- [ ] 我更新了 `prompts/<id>.md`（新增本次 agent 小節）
- [ ] 我更新了 `docs/features/<id>/status.md`（變更摘要 + 驗證命令）
- [ ] 我提供了可複製的驗證命令：`pytest` + `validate-docops`
- [ ] 我沒有寫入任何 token/密鑰


