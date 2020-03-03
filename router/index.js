const KoaRouter = require("koa-router")

const router = new KoaRouter()

router.use('/user', require('./user'))

module.exports = router