const Koa = require('../lib/application');
const app = new Koa();
const PORT = 3000;

app.use(async ctx => {
  ctx.body= '<p>line 1</p>';
})

app.listen(PORT, () => {
  console.log(`The web server is starting at port ${PORT}`)
})
