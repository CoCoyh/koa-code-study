/**
 * 模版渲染中间件
 */
const path = require('path');
const fs = require('fs');

function view (app, opts = {}) {
  const {baseDir = ''} = opts;
  console.log('11111', baseDir);
  app.context.render = function(page = '', obj = {}) {
    let ctx = this;
    let filePath = path.join(baseDir, page);
    console.log('22222', filePath)
    if (fs.existsSync(filePath)) {
      let tpl = fs.readFileSync(filePath, 'binary');
      ctx.body = tpl;
    } else {
      ctx.throw(404);
    }
  }
}

module.exports = view;