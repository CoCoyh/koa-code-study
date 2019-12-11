const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const body = require('../lib/bodyparser/index');

const app = new Koa();

app.use(async(ctx, next) => {
  if (ctx.url === '/') {
    // 当GET请求时候返回表单页面
    let html = fs.readFileSync(path.join(__dirname, './body/index.html'), 'binary');
    ctx.body = html;
  } else if (ctx.url === '/post' && ctx.method === 'POST') {
    ctx.body = ctx.request.body;
  } else {
    ctx.body = '<h1>404!!! </h1>'
  }
  await next();
})

app.listen(3000, () => {
  console.log('[demo] is starting at port 3000');
})