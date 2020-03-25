const KoaRouter = require('koa-router')
const router = new KoaRouter()
const { GetPhotoList, UpdatePhoto } = require('../controller/photo')
router.post('/get_photo_list', GetPhotoList)
router.post('/update_photo', UpdatePhoto)

module.exports = router.routes()