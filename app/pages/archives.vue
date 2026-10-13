<script setup lang="ts">
const { posts } = await useBlogList()

const byYear = new Map<number, typeof posts>()
for (const post of posts) {
  const year = Number(post.date.slice(0, 4))
  if (!byYear.has(year)) byYear.set(year, [])
  byYear.get(year)!.push(post)
}
const years = [...byYear.keys()].sort((a, b) => b - a)

useSeoMeta({
  title: '归档',
  description: '按时间线浏览全部文章。',
})
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-extrabold tracking-tight">归档</h1>
      <p class="text-zinc-500 dark:text-zinc-400">共 {{ posts.length }} 篇文章</p>
    </header>

    <section v-for="year in years" :key="year" class="space-y-4">
      <h2 class="flex items-center gap-3 text-xl font-bold">
        {{ year }}
        <span class="text-sm font-normal text-zinc-400">{{ byYear.get(year)!.length }} 篇</span>
      </h2>
      <ol class="relative space-y-1 border-l-2 border-zinc-200 pl-6 dark:border-zinc-800">
        <li v-for="post in byYear.get(year)" :key="post.path">
          <NuxtLink
            :to="post.path"
            class="group flex items-baseline gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-white dark:hover:bg-zinc-900"
          >
            <span
              class="absolute -left-[5px] mt-2 size-2 rounded-full bg-zinc-300 ring-4 ring-zinc-50 transition-colors group-hover:bg-indigo-500 dark:bg-zinc-600 dark:ring-zinc-950 dark:group-hover:bg-indigo-400"
            />
            <time class="shrink-0 font-mono text-sm text-zinc-400">{{ post.date.slice(5) }}</time>
            <span class="font-medium transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {{ post.title }}
            </span>
          </NuxtLink>
        </li>
      </ol>
    </section>
  </div>
</template>
