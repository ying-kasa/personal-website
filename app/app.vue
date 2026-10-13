<script setup lang="ts">
import { site } from '#shared/utils/site'

useHead({
  title: site.title,
  meta: [{ name: 'description', content: site.description }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
