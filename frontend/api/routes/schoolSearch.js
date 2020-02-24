import fs from 'fs'
import path from 'path'
import Router from 'koa-router'
import parse from 'csv-parse/lib/sync'
import Fuse from 'fuse.js'
import consola from 'consola'

const router = Router()

const fuseOptions = {
  shouldSort: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['id', 'name']
}

const file = fs.readFileSync(path.join(__dirname, 'schoolData.csv'), 'utf-8')
const schoolData = parse(file, {
  columns: true,
  trim: true
})
const fuse = new Fuse(schoolData, fuseOptions)
consola.success(`Loaded ${schoolData.length} schools into /api/school-search`)

consola.success('Registered /api/school-search')
router.get('/school-search', (ctx, next) => {
  const search = ctx.query.id ? ctx.query.id : ctx.query.name || ''
  ctx.body = fuse.search(search).slice(0, 30)
  ctx.status = 200
})

export default router
