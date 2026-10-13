<script setup lang="ts">
const show = ref(false)

onMounted(() => {
  const onScroll = () => {
    show.value = window.scrollY > 400
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-2 opacity-0"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="translate-y-2 opacity-0"
  >
    <button
      v-if="show"
      class="fixed bottom-6 right-6 z-40 flex size-10 items-center justify-center rounded-full bg-white text-zinc-600 shadow-lg ring-1 ring-zinc-200 transition-colors hover:text-indigo-600 dark:bg-zinc-900 dark:text-zinc-400 dark:ring-zinc-800 dark:hover:text-indigo-400"
      aria-label="返回顶部"
      @click="toTop"
    >
      <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5m-7 7 7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>
