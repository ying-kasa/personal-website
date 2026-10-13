<script setup lang="ts">
import { site } from '#shared/utils/site'
import { galleryAlbums } from '~/utils/galleries'

const { posts } = await useBlogList()

const photoCount = galleryAlbums.reduce((sum, album) => sum + album.photos.length, 0)
const days = Math.max(0, Math.floor((Date.now() - new Date(site.launchDate).getTime()) / 86_400_000))

useSeoMeta({
  title: site.title,
  description: site.description,
  ogTitle: site.title,
  ogDescription: site.description,
  ogType: 'website',
})
</script>

<template>
  <div class="space-y-16">
    <!-- 个人介绍 -->
    <section class="flex flex-col items-center gap-6 py-10 text-center">
      <img
        src="/avatar.svg"
        :alt="site.name"
        class="size-24 rounded-full ring-4 ring-white shadow-lg dark:ring-zinc-800"
        width="96"
        height="96"
      >
      <div class="space-y-3">
        <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">
          你好，我是
          <span class="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">{{ site.name }}</span>
        </h1>
        <p class="mx-auto max-w-xl text-zinc-500 dark:text-zinc-400">{{ site.description }}</p>
      </div>
      <div class="flex items-center gap-3">
        <a
          v-for="social in site.socials"
          :key="social.label"
          :href="social.href"
          :aria-label="social.label"
          class="flex size-10 items-center justify-center rounded-full bg-white text-zinc-600 ring-1 ring-zinc-200 transition-all hover:-translate-y-0.5 hover:text-indigo-600 hover:ring-indigo-300 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-zinc-800 dark:hover:text-indigo-400 dark:hover:ring-indigo-500/50"
          :target="social.href.startsWith('http') ? '_blank' : undefined"
          :rel="social.href.startsWith('http') ? 'noopener' : undefined"
        >
          <svg v-if="social.icon === 'github'" class="size-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
          <svg v-else-if="social.icon === 'mail'" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-10 6L2 7" />
          </svg>
          <svg v-else-if="social.icon === 'rss'" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" fill="currentColor" />
          </svg>
        </a>
      </div>
    </section>

    <!-- 数据统计 -->
    <section>
      <StatBar :posts="posts.length" :photos="photoCount" :days="days" />
    </section>

    <!-- 最新文章 -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold tracking-tight">最新文章</h2>
        <NuxtLink to="/blog" class="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400">
          查看全部 →
        </NuxtLink>
      </div>
      <div v-if="posts.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PostCard v-for="post in posts.slice(0, 3)" :key="post.path" :post="post" />
      </div>
      <p v-else class="rounded-2xl bg-white p-8 text-center text-sm text-zinc-500 ring-1 ring-zinc-200/80 dark:bg-zinc-900 dark:ring-zinc-800">
        还没有文章，去 content/blog/ 目录写下第一篇吧。
      </p>
    </section>

    <!-- 相册掠影 -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold tracking-tight">相册掠影</h2>
        <NuxtLink to="/gallery" class="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400">
          进入相册 →
        </NuxtLink>
      </div>
      <div class="grid gap-6 sm:grid-cols-3">
        <NuxtLink
          v-for="album in galleryAlbums"
          :key="album.slug"
          :to="`/gallery/${album.slug}`"
          class="group relative overflow-hidden rounded-2xl ring-1 ring-zinc-200/80 dark:ring-zinc-800"
        >
          <img
            :src="album.cover"
            :alt="album.title"
            class="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          >
          <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
            <p class="font-bold text-white">{{ album.title }}</p>
            <p class="text-xs text-white/70">{{ album.photos.length }} 张照片</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
