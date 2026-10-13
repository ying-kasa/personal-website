<script setup lang="ts">
definePageMeta({
  validate: ({ params }) => /^\d+$/.test(String(params.page)) && Number(params.page) >= 2,
})

const route = useRoute()
const page = Number(route.params.page)

const { pageOf, totalPages } = await useBlogList()

if (page > totalPages) {
  throw createError({ statusCode: 404, statusMessage: '页面不存在', fatal: true })
}

const posts = pageOf(page)

const prevTo = page - 1 <= 1 ? '/blog' : `/blog/page/${page - 1}`
const nextTo = `/blog/page/${page + 1}`

useSeoMeta({
  title: `博客 · 第 ${page} 页`,
  description: '全部文章：技术笔记与生活随笔。',
})
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-extrabold tracking-tight">博客</h1>
      <p class="text-zinc-500 dark:text-zinc-400">第 {{ page }} 页，共 {{ totalPages }} 页</p>
    </header>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <PostCard v-for="post in posts" :key="post.path" :post="post" />
    </div>

    <nav v-if="totalPages > 1" class="flex items-center justify-center gap-4 pt-4">
      <NuxtLink
        :to="prevTo"
        class="rounded-full bg-white px-5 py-2 text-sm font-medium ring-1 ring-zinc-200 transition-colors hover:text-indigo-600 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-indigo-400"
      >
        ← 上一页
      </NuxtLink>
      <span class="text-sm text-zinc-500">{{ page }} / {{ totalPages }}</span>
      <NuxtLink
        v-if="page < totalPages"
        :to="nextTo"
        class="rounded-full bg-white px-5 py-2 text-sm font-medium ring-1 ring-zinc-200 transition-colors hover:text-indigo-600 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-indigo-400"
      >
        下一页 →
      </NuxtLink>
    </nav>
  </div>
</template>
