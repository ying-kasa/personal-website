<script setup lang="ts">
interface Photo {
  src: string
  title: string
  description?: string
}

const props = defineProps<{
  photos: Photo[]
  index: number | null
}>()

const emit = defineEmits<{ 'update:index': [value: number | null] }>()

const isOpen = computed(() => props.index !== null)
const current = computed(() => (props.index !== null ? props.photos[props.index] : null))

function close() {
  emit('update:index', null)
}

function prev() {
  if (props.index === null) return
  emit('update:index', (props.index - 1 + props.photos.length) % props.photos.length)
}

function next() {
  if (props.index === null) return
  emit('update:index', (props.index + 1) % props.photos.length)
}

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && current"
        class="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        @click="close"
      >
        <div class="flex items-center justify-between p-4 text-white" @click.stop>
          <p class="text-sm font-medium">{{ current.title }}</p>
          <button
            class="flex size-9 items-center justify-center rounded-lg hover:bg-white/10"
            aria-label="关闭"
            @click="close"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div class="relative flex flex-1 items-center justify-center px-4 pb-4" @click="close">
          <img
            :src="current.src"
            :alt="current.title"
            class="max-h-full max-w-full rounded-lg object-contain"
            @click.stop
          >

          <button
            class="absolute left-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            aria-label="上一张"
            @click.stop="prev"
          >
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            class="absolute right-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            aria-label="下一张"
            @click.stop="next"
          >
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <p class="pb-4 text-center text-xs text-white/60">
          {{ (index ?? 0) + 1 }} / {{ photos.length }} · 方向键切换，Esc 关闭
        </p>
      </div>
    </Transition>
  </Teleport>
</template>
