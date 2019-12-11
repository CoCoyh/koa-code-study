const mount = require('../lib/mount');
const Koa = require('koa');
const app1 = new Koa();
const app2 = new Koa();

app1.use(async (ctx, next) => {
  await next();
  ctx.body = 'app1'
})

app2.use(async (ctx, next) => {
  await next()
  ctx.body = 'app2';
})

const app = new Koa()

app.use(mount('/app1', app1))
app.use(mount('/app2', app2))

app.listen(3000)
console.log('listening on port 3000');
