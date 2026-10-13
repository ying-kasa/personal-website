<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{ links: TocLink[] }>()

const flat = computed(() =>
  props.links.flatMap(link => [link, ...(link.children ?? [])]),
)

const activeId = ref('')

onMounted(() => {
  const headings = flat.value
    .map(l => document.getElementById(l.id))
    .filter((el): el is HTMLElement => el !== null)

  if (!headings.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-80px 0px -70% 0px' },
  )

  headings.forEach(el => observer.observe(el))
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <nav v-if="links.length" class="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto text-sm xl:block" aria-label="文章目录">
    <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-600">目录</p>
    <ul class="space-y-1.5 border-l border-zinc-200 dark:border-zinc-800">
      <li v-for="link in flat" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="block border-l-2 py-0.5 transition-colors"
          :class="[
            link.depth === 3 ? 'pl-7' : 'pl-4',
            activeId === link.id
              ? '-ml-px border-indigo-500 font-medium text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
              : '-ml-px border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300',
          ]"
        >
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
