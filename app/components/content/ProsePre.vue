<script setup lang="ts">
const props = defineProps({
  code: { type: String, default: '' },
  language: { type: String, default: '' },
  filename: { type: String, default: '' },
  highlights: { type: Array as () => number[], default: () => [] },
  meta: { type: String, default: '' },
})

const preRef = ref<HTMLElement | null>(null)
const copied = ref(false)
const label = ref(props.filename || props.language || '')

onMounted(() => {
  if (!label.value) {
    const code = preRef.value?.querySelector('code')
    label.value = code?.className.match(/language-([\w-]+)/)?.[1] ?? 'text'
  }
})

async function copy() {
  const text = props.code || preRef.value?.textContent || ''
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  }
  catch {
    /* 浏览器不支持剪贴板时静默失败 */
  }
}
</script>

<template>
  <div class="not-prose my-6 overflow-hidden rounded-xl bg-zinc-950 ring-1 ring-zinc-800">
    <div class="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
      <span class="font-mono text-xs text-zinc-400">{{ label || 'text' }}</span>
      <button
        class="rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        :aria-label="copied ? '已复制' : '复制代码'"
        @click="copy"
      >
        {{ copied ? '已复制 ✓' : '复制' }}
      </button>
    </div>
    <pre ref="preRef" class="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-zinc-100"><slot /></pre>
  </div>
</template>
