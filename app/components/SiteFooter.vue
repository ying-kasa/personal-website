<script setup lang="ts">
import { site } from '#shared/utils/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-zinc-200/70 py-8 dark:border-zinc-800/70">
    <div class="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 text-sm text-zinc-500 sm:flex-row sm:justify-between sm:px-6 dark:text-zinc-500">
      <p>© {{ year }} {{ site.name }} · 保留所有权利</p>
      <div class="flex items-center gap-4">
        <NuxtLink to="/rss.xml" class="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">RSS 订阅</NuxtLink>
        <span class="text-zinc-300 dark:text-zinc-700">|</span>
        <span>由 <a href="https://nuxt.com" target="_blank" rel="noopener" class="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Nuxt</a> 驱动</span>
        <!-- 二期接入备案号后取消注释：
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">X ICP 备 XXXXXXXX 号</a>
        -->
      </div>
    </div>
  </footer>
</template>
