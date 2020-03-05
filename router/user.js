const KoaRouter = require('koa-router')
const router = new KoaRouter()
const { crawler, downFile } = require('../controller/crawler')

router.get('/', crawler)
router.post('/down', downFile)

module.exports = router.routes()