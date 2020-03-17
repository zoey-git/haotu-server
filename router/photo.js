const KoaRouter = require('koa-router')
const router = new KoaRouter()
const { PhotoList, SetPhotos } = require('../controller/photo')
router.post('/photo_list', PhotoList)
router.post('/set_photos', SetPhotos)

module.exports = router.routes()