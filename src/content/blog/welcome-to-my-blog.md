---
title: 建立 Astro Blog 的第一篇文章
description: 用 Astro content collections 建立可維護的文章流程，讓內容、路由和版型分離。
pubDate: 2026-03-19
featured: true
tags:
  - Astro
  - Blog
  - Architecture
---

這個 blog 架構的核心目標很簡單：

1. 文章內容放在 `src/content/blog/`
2. 頁面列表由 `src/pages/blog/index.astro` 自動產生
3. 單篇文章由 `src/pages/blog/[...slug].astro` 自動對應

之後要新增文章時，你只需要新增一個 Markdown 檔案，填入 frontmatter：

```md
---
title: 文章標題
description: 一句話摘要
pubDate: 2026-03-19
tags:
  - Astro
  - Notes
---
```

這樣就能讓 Astro 在 build 時自動生成對應頁面。

接下來你可以持續擴充幾個方向：

- 加上 tag 分類頁
- 增加系列文章結構
- 補 RSS、sitemap、SEO metadata
- 將首頁最新文章和精選文章分開展示
