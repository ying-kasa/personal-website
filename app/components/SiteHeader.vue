<script setup lang="ts">
import { site } from '#shared/utils/site'

const route = useRoute()
const open = ref(false)

const nav = [
  { label: '首页', to: '/' },
  { label: '博客', to: '/blog' },
  { label: '相册', to: '/gallery' },
  { label: '归档', to: '/archives' },
  { label: '关于', to: '/about' },
]

function isActive(to: string) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

watch(() => route.fullPath, () => {
  open.value = false
})
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-zinc-200/70 bg-zinc-50/80 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/80">
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
      <NuxtLink to="/" class="flex items-center gap-2 text-lg font-bold tracking-tight">
        <span class="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-sm text-white">
          {{ site.name.charAt(0) }}
        </span>
        <span>{{ site.name }}</span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
          :class="isActive(item.to)
            ? 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400'
            : 'text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100'"
        >
          {{ item.label }}
        </NuxtLink>
        <span class="mx-2 h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
        <ThemeToggle />
      </nav>

      <div class="flex items-center gap-1 md:hidden">
        <ThemeToggle />
        <button
          class="flex size-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:bg-zinc-800/60"
          aria-label="打开菜单"
          @click="open = !open"
        >
          <svg v-if="!open" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <nav v-show="open" class="border-t border-zinc-200/70 px-4 pb-4 pt-2 md:hidden dark:border-zinc-800/70">
      <NuxtLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="block rounded-lg px-3 py-2 text-sm font-medium"
        :class="isActive(item.to)
          ? 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400'
          : 'text-zinc-600 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:bg-zinc-800/60'"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
