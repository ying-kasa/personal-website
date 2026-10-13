<script setup lang="ts">
const route = useRoute()
const tag = decodeURIComponent(String(route.params.tag))

const { posts } = await useBlogList()
const matched = posts.filter(p => p.tags.includes(tag))

if (!matched.length) {
  throw createError({ statusCode: 404, statusMessage: '标签不存在', fatal: true })
}

useSeoMeta({
  title: `标签：${tag}`,
  description: `标签「${tag}」下的全部文章，共 ${matched.length} 篇。`,
})
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2">
      <div class="flex items-center gap-3">
        <NuxtLink to="/tags" class="text-sm text-zinc-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
          ← 标签云
        </NuxtLink>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight">
        <span class="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent"># {{ tag }}</span>
      </h1>
      <p class="text-zinc-500 dark:text-zinc-400">共 {{ matched.length }} 篇文章</p>
    </header>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <PostCard v-for="post in matched" :key="post.path" :post="post" />
    </div>
  </div>
</template>
