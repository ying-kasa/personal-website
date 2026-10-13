import { queryCollection } from '@nuxt/content/server'
import { site } from '#shared/utils/site'

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .order('date', 'DESC')
    .all()

  const tags = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags ?? []) tags.add(tag)
  }

  const urls: Array<{ loc: string, lastmod?: string }> = [
    { loc: '/' },
    { loc: '/blog' },
    { loc: '/tags' },
    { loc: '/archives' },
    { loc: '/gallery' },
    { loc: '/about' },
    ...posts.map(post => ({ loc: post.path, lastmod: post.date })),
    ...[...tags].map(tag => ({ loc: `/tags/${encodeURIComponent(tag)}` })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, lastmod }) => [
  '  <url>',
  `    <loc>${site.url}${loc}</loc>`,
  lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
  '  </url>',
].filter(Boolean).join('\n')).join('\n')}
</urlset>`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
