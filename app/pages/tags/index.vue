<script setup lang="ts">
const { posts } = await useBlogList()

const tagCount = new Map<string, number>()
for (const post of posts) {
  for (const tag of post.tags) {
    tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1)
  }
}
const tags = [...tagCount.entries()].sort((a, b) => b[1] - a[1])

useSeoMeta({
  title: '标签',
  description: '按标签浏览全部文章。',
})
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-extrabold tracking-tight">标签</h1>
      <p class="text-zinc-500 dark:text-zinc-400">共 {{ tags.length }} 个标签</p>
    </header>

    <div v-if="tags.length" class="flex flex-wrap gap-3">
      <NuxtLink
        v-for="[tag, count] in tags"
        :key="tag"
        :to="`/tags/${tag}`"
        class="rounded-full bg-white px-4 py-1.5 ring-1 ring-zinc-200 transition-all hover:-translate-y-0.5 hover:text-indigo-600 hover:ring-indigo-300 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-indigo-400 dark:hover:ring-indigo-500/50"
        :class="count >= 3 ? 'text-base font-semibold' : 'text-sm'"
      >
        {{ tag }}
        <span class="ml-1 text-xs text-zinc-400">{{ count }}</span>
      </NuxtLink>
    </div>
    <p v-else class="rounded-2xl bg-white p-8 text-center text-sm text-zinc-500 ring-1 ring-zinc-200/80 dark:bg-zinc-900 dark:ring-zinc-800">
      还没有标签。
    </p>
  </div>
</template>
