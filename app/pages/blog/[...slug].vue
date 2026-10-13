<script setup lang="ts">
import { site } from '#shared/utils/site'

const route = useRoute()

const { data: post } = await useAsyncData(`post:${route.path}`, () =>
  queryCollection('blog').path(route.path).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: '文章不存在', fatal: true })
}

const { posts } = await useBlogList()
const index = posts.findIndex(p => p.path === route.path)
const newer = index > 0 ? posts[index - 1] : null
const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null
const related = posts
  .filter(p => p.path !== route.path && p.tags.some(t => post.value?.tags.includes(t)))
  .slice(0, 3)

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogType: 'article',
  ...(post.value.cover
    ? { ogImage: new URL(post.value.cover, site.url).href }
    : {}),
})
</script>

<template>
  <article v-if="post" class="space-y-10">
    <header class="space-y-4">
      <div class="flex flex-wrap items-center gap-2">
        <NuxtLink
          v-for="tag in post.tags"
          :key="tag"
          :to="`/tags/${tag}`"
          class="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-500/20 dark:bg-indigo-400/10 dark:text-indigo-400"
        >
          {{ tag }}
        </NuxtLink>
      </div>
      <h1 class="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        {{ post.title }}
      </h1>
      <p class="text-sm text-zinc-500 dark:text-zinc-500">
        发布于 <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      </p>
    </header>

    <img
      v-if="post.cover"
      :src="post.cover"
      :alt="post.title"
      class="max-h-96 w-full rounded-2xl object-cover ring-1 ring-zinc-200/80 dark:ring-zinc-800"
    >

    <div class="flex gap-10">
      <div class="min-w-0 flex-1">
        <div class="prose prose-zinc max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-indigo-600 prose-img:rounded-xl">
          <ContentRenderer :value="post" />
        </div>
      </div>
      <aside class="w-56 shrink-0">
        <Toc :links="(post.body?.toc?.links as any) ?? []" />
      </aside>
    </div>

    <nav class="grid gap-4 sm:grid-cols-2">
      <NuxtLink
        v-if="older"
        :to="older.path"
        class="group rounded-2xl bg-white p-5 ring-1 ring-zinc-200/80 transition-colors hover:ring-indigo-300 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:ring-indigo-500/50"
      >
        <p class="text-xs text-zinc-400">← 上一篇（更早）</p>
        <p class="mt-1 font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{{ older.title }}</p>
      </NuxtLink>
      <NuxtLink
        v-if="newer"
        :to="newer.path"
        class="group rounded-2xl bg-white p-5 text-right ring-1 ring-zinc-200/80 transition-colors hover:ring-indigo-300 sm:col-start-2 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:ring-indigo-500/50"
      >
        <p class="text-xs text-zinc-400">下一篇（更新）→</p>
        <p class="mt-1 font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{{ newer.title }}</p>
      </NuxtLink>
    </nav>

    <section v-if="related.length" class="space-y-5">
      <h2 class="text-xl font-bold tracking-tight">相关文章</h2>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PostCard v-for="item in related" :key="item.path" :post="item" />
      </div>
    </section>
  </article>
</template>
