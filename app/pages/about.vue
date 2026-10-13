<script setup lang="ts">
import { site } from '#shared/utils/site'

/**
 * 关于页的内容直接写在下面这份示例数据里，改成你自己的信息即可。
 */
const skillGroups = [
  { group: '前端', items: ['HTML / CSS', 'JavaScript', 'Vue 3', 'Tailwind CSS'] },
  { group: '工程化', items: ['Vite', 'Nuxt', 'Git'] },
  { group: '正在学习', items: ['TypeScript', 'Node.js', '数据库'] },
]

const timeline = [
  { period: '2026', title: '搭建了这个网站', description: '用 Nuxt + Tailwind 从零开始，记录学习与生活。' },
  { period: '2025', title: '开始系统学习前端', description: '从三件套到框架，一边做小项目一边补基础。' },
  { period: '更早', title: '与代码结缘', description: '第一次让浏览器显示出「Hello World」的那一刻，至今记得。' },
]

useSeoMeta({
  title: '关于',
  description: `关于${site.name}：技能、经历与联系方式。`,
})
</script>

<template>
  <div class="space-y-14">
    <section class="flex flex-col items-center gap-5 py-6 text-center">
      <img
        src="/avatar.svg"
        :alt="site.name"
        class="size-28 rounded-full ring-4 ring-white shadow-lg dark:ring-zinc-800"
        width="112"
        height="112"
      >
      <h1 class="text-3xl font-extrabold tracking-tight">{{ site.name }}</h1>
      <p class="max-w-xl text-zinc-500 dark:text-zinc-400">
        前端学习者、摄影爱好者。在这里写写代码笔记，也记录生活里值得留住的瞬间。
        相信「写下来」是最好的学习方式。
      </p>
    </section>

    <section class="space-y-5">
      <h2 class="text-xl font-bold tracking-tight">技能</h2>
      <div class="space-y-4">
        <div v-for="group in skillGroups" :key="group.group" class="flex flex-wrap items-center gap-3">
          <span class="w-20 shrink-0 text-sm font-semibold text-zinc-400">{{ group.group }}</span>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in group.items"
              :key="item"
              class="rounded-lg bg-white px-3 py-1.5 text-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-5">
      <h2 class="text-xl font-bold tracking-tight">经历</h2>
      <ol class="relative space-y-8 border-l-2 border-zinc-200 pl-6 dark:border-zinc-800">
        <li v-for="item in timeline" :key="item.period" class="relative">
          <span class="absolute -left-[31px] top-1.5 size-2.5 rounded-full bg-indigo-500 ring-4 ring-zinc-50 dark:bg-indigo-400 dark:ring-zinc-950" />
          <p class="font-mono text-sm text-indigo-600 dark:text-indigo-400">{{ item.period }}</p>
          <h3 class="mt-1 font-bold">{{ item.title }}</h3>
          <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{{ item.description }}</p>
        </li>
      </ol>
    </section>

    <section class="space-y-5">
      <h2 class="text-xl font-bold tracking-tight">联系我</h2>
      <div class="grid gap-4 sm:grid-cols-3">
        <a
          v-for="social in site.socials"
          :key="social.label"
          :href="social.href"
          class="rounded-2xl bg-white p-5 text-center ring-1 ring-zinc-200/80 transition-all hover:-translate-y-0.5 hover:ring-indigo-300 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:ring-indigo-500/50"
          :target="social.href.startsWith('http') ? '_blank' : undefined"
          :rel="social.href.startsWith('http') ? 'noopener' : undefined"
        >
          <p class="font-bold">{{ social.label }}</p>
          <p class="mt-1 truncate text-xs text-zinc-400">{{ social.href.replace(/^https?:\/\//, '').replace('mailto:', '') }}</p>
        </a>
      </div>
    </section>

    <section class="rounded-2xl bg-gradient-to-r from-indigo-500/10 to-violet-600/10 p-8 text-center ring-1 ring-indigo-500/20">
      <p class="text-sm text-zinc-600 dark:text-zinc-400">
        留言板将在二期上线——到时候欢迎来这里说句话。
      </p>
    </section>
  </div>
</template>
