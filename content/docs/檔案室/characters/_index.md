---
title: "人物檔案庫"
weight: 1
bookCollapseSection: true
---

# 人物檔案庫

這裏收錄了故事中的主要人物檔案！

<!-- 自動列出所有人物 -->
{{ range where .Site.RegularPages "Params.type" "character" }}
<div class="character-card">
  <h3><a href="{{ .RelPermalink }}">{{ .Title }}</a></h3>
  {{ if .Params.ru_name }}<div>{{ .Params.ru_name }}</div>{{ end }}
  {{ if .Params.en_name }}<div>{{ .Params.en_name }}</div>{{ end }}
</div>
{{ end }}