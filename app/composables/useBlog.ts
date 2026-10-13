export const BLOG_PAGE_SIZE = 8

export interface BlogListItem {
  path: string
  title: string
  description: string
  date: string
  tags: string[]
  cover?: string
}

/** 全站共用一份按日期倒序的完整文章列表（个人博客量级下直接取全量再切片） */
export async function useBlogList() {
  const { data } = await useAsyncData('blog-list', () =>
    queryCollection('blog')
      .order('date', 'DESC')
      .select('path', 'title', 'description', 'date', 'tags', 'cover')
      .all() as unknown as Promise<BlogListItem[]>,
  )

  const posts = data.value ?? []

  function pageOf(page: number) {
    return posts.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE)
  }

  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_PAGE_SIZE))

  return { posts, pageOf, totalPages }
}
