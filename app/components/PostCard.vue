<script setup lang="ts">
interface Post {
  path: string
  title: string
  description: string
  date: string
  tags?: string[]
  cover?: string
}

const props = defineProps<{ post: Post }>()

const isRaster = computed(() => !!props.post.cover && /\.(png|jpe?g|webp|avif)$/i.test(props.post.cover))
</script>

<template>
  <NuxtLink
    :to="post.path"
    class="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200/80 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-indigo-300 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:ring-indigo-500/50"
  >
    <div class="h-44 overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
      <NuxtImg
        v-if="post.cover && isRaster"
        :src="post.cover"
        :alt="post.title"
        class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        format="webp"
        quality="80"
      />
      <img
        v-else-if="post.cover"
        :src="post.cover"
        :alt="post.title"
        class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      >
    </div>

    <div class="flex flex-1 flex-col gap-2 p-5">
      <div class="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      </div>
      <h3 class="font-bold leading-snug text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
        {{ post.title }}
      </h3>
      <p class="line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">{{ post.description }}</p>
      <div v-if="post.tags?.length" class="mt-auto flex flex-wrap gap-1.5 pt-2">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
