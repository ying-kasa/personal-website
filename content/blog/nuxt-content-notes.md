---
title: Nuxt 与 Nuxt Content 上手笔记
description: 用 Nuxt Content 管理 Markdown 博客的核心概念：集合、查询、自动路由，以及搭建时踩过的坑。
date: 2026-10-08
tags: [前端, Nuxt, 教程]
cover: /covers/nuxt.svg
---

这个网站的博客模块用 Nuxt Content 搭建，把学习过程中的关键概念记录一下。

## 集合（Collection）是什么

在 `content.config.ts` 里定义内容的「形状」，每篇文章就是一个带结构的 Markdown 文件：

```ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        tags: z.array(z.string()).default([]),
      }),
    }),
  },
})
```

schema 用的是 Zod，写错 frontmatter 字段类型时构建会直接报错，很安心。

## 查询内容

页面里用 `queryCollection` 取数据，链式调用很直观：

```vue
<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .only(['path', 'title', 'description', 'date', 'tags'])
    .all(),
)
</script>
```

几个常用方法：

- `.path('/blog/hello-world')`：按路径精确取一篇
- `.only([...])`：只取需要的字段，减少载荷
- `.skip(n).limit(m)`：分页

### 服务端路由里也能查

RSS 这类 server route 里查询时，第一个参数要传 `event`：

```ts
const posts = await queryCollection(event, 'blog')
  .order('date', 'DESC')
  .all()
```

## 渲染与排版

文章正文交给 `<ContentRenderer>` 渲染，代码高亮开箱即用。想要自定义代码块（比如加复制按钮），在 `components/content/` 下放一个同名组件覆盖默认行为就行——本站的代码块就是这么加上复制按钮的。

## 踩过的坑

1. **frontmatter 的日期**：用字符串 `'2026-10-08'` 而不是 `Date`，避免时区把日期挪走一天
2. **静态部署要开链接抓取**：`nitro.prerender.crawlLinks = true`，否则只有首页被预渲染
3. **查询结果可能是 null**：取单篇时记得判空并抛 404，而不是让页面白屏

## 小结

Nuxt Content 的思路是「内容即文件、文件即数据库」，对个人博客来说刚刚好。下一篇打算写写 Tailwind v4 的新用法。
