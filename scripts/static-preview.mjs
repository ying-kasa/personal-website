/**
 * 极简静态文件服务器：用于本地预览 .output/public 构建产物。
 * 用法：node scripts/static-preview.mjs [端口]（默认 4173）
 */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const port = Number(process.argv[2]) || 4173
const root = join(process.cwd(), '.output/public')

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    let file = join(root, normalize(pathname).replace(/^([/\\])+/, ''))

    try {
      if ((await stat(file)).isDirectory()) file = join(file, 'index.html')
    } catch {}

    try {
      await stat(file)
    } catch {
      file = join(root, '404.html')
    }

    res.setHeader('content-type', types[extname(file)] ?? 'application/octet-stream')
    res.end(await readFile(file))
  } catch {
    res.statusCode = 500
    res.end('Internal Server Error')
  }
}).listen(port, () => {
  console.log(`静态预览已启动: http://localhost:${port}`)
})
