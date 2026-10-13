<script setup lang="ts">
defineProps<{
  posts: number
  photos: number
  days: number
}>()
</script>

<template>
  <div class="grid grid-cols-3 gap-3 sm:gap-4">
    <div class="rounded-2xl bg-white p-4 text-center ring-1 ring-zinc-200/80 sm:p-5 dark:bg-zinc-900 dark:ring-zinc-800">
      <p class="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
        {{ posts }}
      </p>
      <p class="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-500">篇文章</p>
    </div>
    <div class="rounded-2xl bg-white p-4 text-center ring-1 ring-zinc-200/80 sm:p-5 dark:bg-zinc-900 dark:ring-zinc-800">
      <p class="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
        {{ photos }}
      </p>
      <p class="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-500">张照片</p>
    </div>
    <div class="rounded-2xl bg-white p-4 text-center ring-1 ring-zinc-200/80 sm:p-5 dark:bg-zinc-900 dark:ring-zinc-800">
      <p class="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
        {{ days }}
      </p>
      <p class="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-500">天运行</p>
    </div>
  </div>
</template>
