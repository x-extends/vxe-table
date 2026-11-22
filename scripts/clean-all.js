/**
 * 一键清理当前项目根目录：
 *   - node_modules 目录
 *   - dist 目录
 *   - .eslintcache 文件
 *   - package-lock.json
 *   - pnpm-lock.yaml
 *   - *.zip 文件（docs_*.zip、i18n.zip 等所有 zip 产物）
 */
const fsp = require('node:fs/promises')
const path = require('node:path')

const root = path.resolve(__dirname, '..')

/** 根目录下固定清理项 */
const targets = [
  { name: 'node_modules', isDir: true },
  { name: 'es', isDir: true },
  { name: 'dist', isDir: true },
  { name: 'lib', isDir: true },
  { name: '.eslintcache', isDir: false },
  { name: 'package-lock.json', isDir: false },
  { name: 'pnpm-lock.yaml', isDir: false }
]

/** 根目录下按扩展名匹配清理 */
const zipExt = '.zip'

/** 计算目录总大小 */
async function dirSize (dir) {
  let total = 0
  try {
    const entries = await fsp.readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) {
        total += await dirSize(full)
      } else if (e.isFile()) {
        try {
          total += (await fsp.stat(full)).size
        } catch {}
      }
    }
  } catch {}
  return total
}

async function main () {
  const start = Date.now()

  // 1. 固定清单
  const items = []
  for (const t of targets) {
    const full = path.join(root, t.name)
    try {
      const stat = await fsp.lstat(full)
      const size = t.isDir ? await dirSize(full) : stat.size
      items.push({ name: t.name, full, isDir: t.isDir, size })
    } catch {
      // 不存在，跳过
    }
  }

  // 2. 根目录 *.zip
  try {
    const entries = await fsp.readdir(root, { withFileTypes: true })
    for (const e of entries) {
      if (!e.isFile()) continue
      if (!e.name.toLowerCase().endsWith(zipExt)) continue
      const full = path.join(root, e.name)
      try {
        const stat = await fsp.stat(full)
        items.push({ name: e.name, full, isDir: false, size: stat.size })
      } catch {}
    }
  } catch {}

  if (items.length === 0) {
    console.log('没有需要清理的内容')
    return
  }

  const totalBytes = items.reduce((sum, it) => sum + it.size, 0)

  // 3. 打印清单
  console.log(`清理 ${items.length} 项：`)
  for (const it of items) {
    const mb = (it.size / 1024 / 1024).toFixed(2)
    console.log(`  ${it.isDir ? '📁' : '📄'} ${it.name}  (${mb} MB)`)
  }
  console.log(`\n合计 ${(totalBytes / 1024 / 1024).toFixed(2)} MB\n`)

  // 4. 删除
  let ok = 0
  let errs = 0
  for (const it of items) {
    try {
      await fsp.rm(it.full, { recursive: true, force: true, maxRetries: 3 })
      ok++
    } catch (err) {
      errs++
      console.error(`❌ 删除失败：${it.name} — ${err?.message ?? err}`)
    }
  }

  console.log(`完成 ${ok}/${items.length}，失败 ${errs}，耗时 ${Date.now() - start}ms`)
  if (errs) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
