# 个人网站（V1 静态版）

基于 **Nuxt 4 + Tailwind CSS v4 + Nuxt Content** 的个人网站，纯静态生成，
零服务器、零数据库，`git push` 即自动上线。

## 功能一览

- 首页：个人介绍、社交链接、数据统计条、最新文章、相册掠影
- 博客：Markdown 写作、标签筛选、分页（每页 8 篇）、归档时间线
- 文章页：代码高亮 + 一键复制、侧边目录、上一篇/下一篇、相关文章、SEO/OG
- 相册：多相簿、瀑布流、灯箱预览（键盘翻页）
- 关于页：技能、经历时间线、联系方式
- 全局：暗色模式、响应式（移动端汉堡菜单）、RSS、sitemap、自定义 404

## 快速开始

```bash
npm install        # 首次需要（已完成可跳过）
npm run dev        # 开发模式，访问 http://localhost:3000
```

构建与本地预览（模拟线上真实产物）：

```bash
npm run generate                    # 生成静态站点到 .output/public
node scripts/static-preview.mjs     # 本地预览 http://localhost:4173
```

## 目录结构

```
├─ content/blog/          # ✍️ 你的文章（Markdown）
├─ public/                # 静态资源
│  ├─ covers/             #    文章封面图
│  ├─ gallery/            #    相册照片
│  ├─ avatar.svg          #    头像
│  └─ favicon.svg         #    站点图标
├─ app/
│  ├─ pages/              # 页面（首页/博客/相册/归档/关于）
│  ├─ components/         # 组件（灯箱、目录、文章卡片…）
│  │  └─ content/         #    Markdown 渲染覆盖（代码块复制按钮）
│  ├─ layouts/            # 全局布局（导航+页脚）
│  └─ utils/galleries.ts  # 📷 相册数据（相簿和照片在这里登记）
├─ shared/utils/site.ts   # ⚙️ 站点配置（姓名/简介/社交链接/上线日期）
├─ server/routes/         # RSS 与 sitemap 生成
└─ content.config.ts      # 文章 frontmatter 字段定义
```

## 写一篇新文章

在 `content/blog/` 新建 `my-post.md`：

```md
---
title: 文章标题
description: 一句话摘要（列表页和分享卡片会用到）
date: 2026-10-14
tags: [前端, 随笔]
cover: /covers/my-post.svg
---

正文支持 Markdown：标题、列表、表格、引用、代码块（自动高亮+复制按钮）。
```

文件名就是访问路径：`my-post.md` → `/blog/my-post`。
封面图放进 `public/covers/`；没有封面可省略 `cover` 字段。

## 管理相册

1. 照片文件放进 `public/gallery/`（JPG/PNG/WebP 均可，建议单张 500KB 以内）
2. 打开 `app/utils/galleries.ts`，在对应相簿的 `photos` 里加一行：
   `{ src: '/gallery/照片文件名', title: '照片标题' }`
3. 新建相簿：复制一个 album 对象改 `slug`（即访问路径 `/gallery/slug`）

## 个性化配置

| 要改什么 | 去哪里改 |
| --- | --- |
| 姓名、简介、社交链接、上线日期 | `shared/utils/site.ts` |
| 头像 | 替换 `public/avatar.svg` |
| 站点图标 | 替换 `public/favicon.svg` |
| 关于页的技能/经历/介绍 | `app/pages/about.vue` 顶部的示例数据 |
| 每页文章数 | `app/composables/useBlog.ts` 的 `BLOG_PAGE_SIZE` |

## 部署上线（腾讯 EdgeOne Pages，免费）

1. **推送到 GitHub**（首次）：

   ```bash
   git init
   git add .
   git commit -m "init: 个人网站 V1"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

   > 国内 push GitHub 不稳时，可给 git 配置代理，或先推 Gitee 再同步。

2. **接入 EdgeOne Pages**：打开 [edgeone.cloud.tencent.com](https://edgeone.cloud.tencent.com) → 产品 → Pages →
   创建项目 → 关联 GitHub 仓库，框架选 Nuxt（或按下面手动配置）：
   - 构建命令：`npm run generate`
   - 输出目录：`.output/public`
3. 之后每次 `git push`，EdgeOne 自动构建发布，无需任何手动操作。

备选平台（同样免费，配置相同）：Vercel、Cloudflare Pages、Netlify。

## 上线后记得改

- [ ] `shared/utils/site.ts` 里的 `url` 改成真实域名（影响 RSS/sitemap/分享链接）
- [ ] `public/robots.txt` 里的 sitemap 地址同步改成真实域名
- [ ] `shared/utils/site.ts` 里的 GitHub / 邮箱换成真实账号
- [ ] 绑定自定义域名后，如需大陆节点加速，按控制台指引做 ICP 备案

## V2 规划（二期）

说说流、自建评论、留言板、点赞与浏览量、在线写作后台（Nuxt server routes + Supabase 免费档）。
V1 的全部内容与代码可直接沿用，无需迁移。

## 常见问题

- **改了文章没生效**：`npm run generate` 是构建产物，dev 模式实时生效；线上靠 push 触发重建
- **首页"运行天数"不变**：它是构建时计算的，重新部署即刷新
- **装依赖慢/失败**：`npm install --registry=https://registry.npmmirror.com`
