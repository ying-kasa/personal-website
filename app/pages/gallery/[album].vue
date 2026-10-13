<script setup lang="ts">
import { galleryAlbums } from '~/utils/galleries'

const route = useRoute()
const album = galleryAlbums.find(a => a.slug === route.params.album)

if (!album) {
  throw createError({ statusCode: 404, statusMessage: '相簿不存在', fatal: true })
}

const lightboxIndex = ref<number | null>(null)

useSeoMeta({
  title: `相册 · ${album.title}`,
  description: album.description,
  ogTitle: `相册 · ${album.title}`,
  ogDescription: album.description,
})
</script>

<template>
  <div v-if="album" class="space-y-8">
    <header class="space-y-2">
      <div class="flex items-center gap-3">
        <NuxtLink to="/gallery" class="text-sm text-zinc-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
          ← 全部相簿
        </NuxtLink>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight">{{ album.title }}</h1>
      <p class="text-zinc-500 dark:text-zinc-400">{{ album.description }} · {{ album.photos.length }} 张</p>
    </header>

    <GalleryGrid :photos="album.photos" @select="lightboxIndex = $event" />

    <Lightbox v-model:index="lightboxIndex" :photos="album.photos" />
  </div>
</template>
