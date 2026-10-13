/** 把 '2026-10-13' 格式化为 '2026 年 10 月 13 日' */
export function formatDate(date: string): string {
  const [y, m, d] = date.split('-')
  if (!y || !m || !d) return date
  return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`
}
