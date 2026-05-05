import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve(process.cwd(), 'dist')
const index = path.join(dist, 'index.html')
const notFound = path.join(dist, '404.html')

if (!fs.existsSync(index)) {
  console.error('dist/index.html missing — run vite build first')
  process.exit(1)
}
fs.copyFileSync(index, notFound)
console.log('gh-pages: copied index.html → 404.html for SPA deep links')
