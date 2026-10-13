<script setup lang="ts">
/**
 * 内联代码（行内 `code`）样式。块级代码块的容器与复制按钮见 ProsePre.vue。
 */
defineProps({
  code: { type: String, default: '' },
  language: { type: String, default: '' },
})
</script>

<template>
  <code class="rounded-md bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.875em] font-medium text-indigo-700 dark:bg-zinc-800 dark:text-indigo-300">
    <slot>{{ code }}</slot>
  </code>
</template>
