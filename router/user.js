const KoaRouter = require('koa-router')
const router = new KoaRouter()

router.get('/', async (ctx, next) => {
    return ctx.body = {
        code: 200
    }
})

module.exports = router.routes()