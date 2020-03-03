const Koa = require('koa')
const router = require('./router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()


app.use(bodyParser())

app.use(router.routes())

app.listen(3000, () => {
    console.log("server is run at http://localhost:3000");
})