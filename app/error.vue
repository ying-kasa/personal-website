<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const messages: Record<number, string> = {
  404: '页面去火星了，或者从未存在过。',
  500: '服务器开小差了，稍后再试试。',
}

function backHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-4 text-center dark:bg-zinc-950">
    <p class="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-7xl font-extrabold text-transparent">
      {{ props.error?.statusCode ?? 404 }}
    </p>
    <p class="text-zinc-500 dark:text-zinc-400">
      {{ messages[props.error?.statusCode ?? 404] ?? '发生了一点小问题。' }}
    </p>
    <div class="flex gap-3">
      <button
        class="rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
        @click="backHome"
      >
        回到首页
      </button>
    </div>
  </div>
</template>
