<script setup lang="ts">
interface Photo {
  src: string
  title: string
  description?: string
}

defineProps<{ photos: Photo[] }>()
defineEmits<{ select: [index: number] }>()
</script>

<template>
  <div class="columns-2 gap-4 md:columns-3">
    <button
      v-for="(photo, i) in photos"
      :key="photo.src"
      class="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl ring-1 ring-zinc-200/80 dark:ring-zinc-800"
      :aria-label="`查看 ${photo.title}`"
      @click="$emit('select', i)"
    >
      <img
        :src="photo.src"
        :alt="photo.title"
        class="w-full transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      >
      <span class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-left text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
        {{ photo.title }}
      </span>
    </button>
  </div>
</template>
