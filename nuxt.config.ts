import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/color-mode'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
  },

  image: {
    quality: 80,
    formats: ['webp'],
  },

  // 纯静态生成：从首页开始抓取所有链接并预渲染
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/rss.xml', '/sitemap.xml'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'RSS', href: '/rss.xml' },
      ],
    },
  },
})
