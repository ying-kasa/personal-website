<script setup lang="ts">
const { posts: allPosts, pageOf, totalPages } = await useBlogList()
const posts = pageOf(1)

useSeoMeta({
  title: '博客',
  description: '全部文章：技术笔记与生活随笔。',
  ogTitle: '博客',
  ogDescription: '全部文章：技术笔记与生活随笔。',
})
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-extrabold tracking-tight">博客</h1>
      <p class="text-zinc-500 dark:text-zinc-400">技术笔记与生活随笔，共 {{ allPosts.length }} 篇</p>
    </header>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <PostCard v-for="post in posts" :key="post.path" :post="post" />
    </div>

    <nav v-if="totalPages > 1" class="flex justify-center pt-4">
      <NuxtLink
        to="/blog/page/2"
        class="rounded-full bg-white px-5 py-2 text-sm font-medium ring-1 ring-zinc-200 transition-colors hover:text-indigo-600 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-indigo-400"
      >
        下一页 →
      </NuxtLink>
    </nav>
  </div>
</template>
