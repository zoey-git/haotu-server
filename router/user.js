const KoaRouter = require('koa-router')
const router = new KoaRouter()
// const { crawler, downFile } = require('../controller/crawler')
const { AddUser, Login, ChangeUserPassword } = require('../controller/user/user')

router.post('/register_user', AddUser)
.post('/login', Login)
.post('/change_user_password', ChangeUserPassword)

module.exports = router.routes()