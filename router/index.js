const KoaRouter = require("koa-router")

const router = new KoaRouter()

router.use('/user', require('./user'))
router.use('/photo', require('./photo'))
module.exports = router