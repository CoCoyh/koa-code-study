/**
 * 多个子应用合并成一个父应用，用请求的前缀区分子应用
 */

const path = require('path');
const compose = require('./compose');

function mount(prefix, app) {
  let middleware = app.middleware;
  let middlewareCom = compose(middleware || []);
  if ('/' === prefix) {
    return middlewareCom;
  }

  return async function (ctx, next) {
    console.log('1.......', ctx.path);
    let mountPath = matchPath(ctx.path);
    console.log('.....', mountPath)
    if (!mountPath) {
      return await next();
    }

    let originPath = ctx.path;
    ctx.path = mountPath;

    await middlewareCom(ctx, async () => {
      ctx.path = originPath;
      await next();
      ctx.path = mountPath;
    })

    ctx.path = originPath;

  }
  function matchPath(originPath) {
    if (originPath.indexOf(prefix) < 0) {
      return false;
    }
  
    console.log('2.....', originPath.replace(prefix, ''));
    const mountPath = originPath.replace(prefix, '') || '/';
    if (mountPath[0] !== '/') {
      return false;
    }
    return mountPath;
  }
}

module.exports = mount;
