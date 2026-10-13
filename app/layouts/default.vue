<template>
  <div class="flex min-h-screen flex-col bg-zinc-50 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
    <SiteHeader />
    <main class="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
      <slot />
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
</template>
