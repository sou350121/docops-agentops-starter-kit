# S-0002-onboarding-copy-to-own-repo 状态

- 状态：完成
- Story：
  - stories/S-0002-onboarding-copy-to-own-repo.md
- Prompt：
  - prompts/S-0002-onboarding-copy-to-own-repo.md
- Failures：
  - sessions/S-0002-onboarding-copy-to-own-repo/failures.md
- PR：

## 变更摘要
- README 增加“新手上手：把这套用到你自己的专案”步骤与可直接贴给 agent 的消息模板。
- README 增加最简“角色分工闭环”（PM/Architect → Coder → Reviewer）可复制模板（同一 story + 同一证据链），并将其前置到 README 顶部以便新手快速看到。
- Bootstrap runbook 增加 “0.5) 套用到你自己的专案 repo” 的 SOP（更详细 checklist + 模板）。
- 修复 `scripts/new-story.ps1`：生成 Prompt VCS 时能正确输出 fenced code block（```markdown ... ```）。

## 验证
- `pwsh -NoProfile -File scripts/validate-docops.ps1`

### （可选）验证 new-story.ps1 fenced code block 生成正确
> 会创建并清理一个临时 story（不污染仓库历史，但会改动工作区文件）。

```powershell
$id = "S-9999"; $title = "tmp-verify-fenced-codeblock";
pwsh -NoProfile -File scripts/new-story.ps1 -Id $id -Title $title;
if (-not (Select-String -Path "prompts/$id-$title.md" -SimpleMatch "```markdown")) { throw "Missing fenced code block" };
Remove-Item -Recurse -Force "sessions/$id-$title";
Remove-Item -Recurse -Force "docs/features/$id-$title";
Remove-Item -Force "stories/$id-$title.md","prompts/$id-$title.md"
```
