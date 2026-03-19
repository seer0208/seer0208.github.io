# Personal Website + Astro Blog

這個專案現在已經從 Astro starter 轉成「個人首頁 + blog」的基礎框架。

## 架構重點

- 個人首頁：`src/pages/index.astro`
- Blog 列表頁：`src/pages/blog/index.astro`
- Blog 單篇頁：`src/pages/blog/[...slug].astro`
- Tag 列表頁：`src/pages/blog/tags/index.astro`
- Tag 單一分類頁：`src/pages/blog/tags/[tag].astro`
- RSS feed：`src/pages/rss.xml.ts`
- 文章內容：`src/content/blog/*.md`
- 內容 schema：`src/content.config.ts`
- 共用導覽：`src/components/SiteHeader.astro`
- 共用頁尾：`src/components/SiteFooter.astro`
- SEO / Open Graph：`src/layouts/Layout.astro`

## 發文流程

1. 在 `src/content/blog/` 新增一篇 Markdown 檔案，例如 `my-second-post.md`
2. 填入 frontmatter
3. 寫文章內容
4. 執行 `npm run dev` 預覽
5. 執行 `npm run build` 驗證靜態輸出

## Frontmatter 範例

```md
---
title: 我的第二篇文章
description: 用一句話描述這篇文章在講什麼
pubDate: 2026-03-19
updatedDate: 2026-03-20
draft: false
featured: false
tags:
  - Astro
  - Frontend
---
```

## 目前資料流

- `src/content.config.ts` 定義 blog collection 的欄位格式
- `src/pages/blog/index.astro` 讀取所有已發布文章並排序
- `src/pages/blog/[...slug].astro` 將每篇 Markdown 轉成靜態文章頁
- `src/pages/blog/tags/index.astro` 產生所有 tag 的索引頁
- `src/pages/blog/tags/[tag].astro` 為每個 tag 產生靜態分類頁
- `src/pages/rss.xml.ts` 產生 RSS feed
- `src/pages/index.astro` 讀取最新文章，顯示在首頁
- `src/layouts/Layout.astro` 統一輸出 canonical、Open Graph、Twitter Card、JSON-LD

## 建議的下一步

- 把 `Your Name`、職稱、聯絡方式換成你的真實資料
- 新增 2 到 3 篇文章，確認列表與首頁排序符合預期
- 加上 tag 分類頁
- 補 sitemap
- 依文章自動產生專屬 Open Graph 圖

## 常用指令

```sh
npm install
npm run dev
npm run build
npm run preview
```
