const KoaRouter = require('koa-router')
const router = new KoaRouter()
const { crawler } = require('../controller/crawler')

router.get('/', crawler)

module.exports = router.routes()