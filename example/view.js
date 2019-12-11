const Koa = require('koa');
const path = require('path');
const view = require('../lib/view');

const app = new Koa();

view(app, {baseDir: path.join(__dirname, 'views')});

app.use(async ctx => {
  await ctx.render(`${ctx.path}.html`, {
    title: 'index.page'
  })
})

app.listen(3000, () => {
  console.log('[demo] jsonp is starting at port 3000');
})