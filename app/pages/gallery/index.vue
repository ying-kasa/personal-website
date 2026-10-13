<script setup lang="ts">
import { galleryAlbums } from '~/utils/galleries'

const photoCount = galleryAlbums.reduce((sum, album) => sum + album.photos.length, 0)

useSeoMeta({
  title: '相册',
  description: `用镜头记录生活，共 ${photoCount} 张照片。`,
  ogTitle: '相册',
  ogDescription: `用镜头记录生活，共 ${photoCount} 张照片。`,
})
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-extrabold tracking-tight">相册</h1>
      <p class="text-zinc-500 dark:text-zinc-400">{{ galleryAlbums.length }} 个相簿 · {{ photoCount }} 张照片</p>
    </header>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="album in galleryAlbums"
        :key="album.slug"
        :to="`/gallery/${album.slug}`"
        class="group overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200/80 transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900 dark:ring-zinc-800"
      >
        <div class="h-48 overflow-hidden">
          <img
            :src="album.cover"
            :alt="album.title"
            class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          >
        </div>
        <div class="space-y-1 p-5">
          <div class="flex items-center justify-between">
            <h2 class="font-bold">{{ album.title }}</h2>
            <span class="text-xs text-zinc-400">{{ album.photos.length }} 张</span>
          </div>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ album.description }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
