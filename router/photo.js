const KoaRouter = require('koa-router')
const router = new KoaRouter()
const { PhotoList } = require('../controller/photo')

router.post('/photo_list', PhotoList)

module.exports = router.routes()