/**
 * koa.js官方最koa-send进行了二次封装，退出了koa-staticszhongjianjain
 * 目标是用于做静态服务器或者项目静态管理
 * 1. 配置静态资源绝对路径
 * 2. 判断是否支持等待其它请求
 * 3. 判断是否为GET和HEAD类型的请求
 * 4. 通过koa-send中间件读取和返回静态文件
 */
const { resolve } = require('path');
const send = require('./send');

function statics (opts = {
  root: ''
}) {
  opts.root = resolve(opts.root);

  if (!opts.defer) {
    return async function statics(ctx, next) {
      let done = false;

      if (ctx.method === 'HEAD' || ctx.method === 'GET') {
        try {
          done = await send(ctx, ctx.path, opts);
        } catch(err) {
          if (err.status !== 404) {
            throw err;
          }
        }
      }
      if (!done) {
        await next();
      }
    }
  }

  return async function statics(ctx, next) {
    await next();

    if (ctx.method !== 'HEAD' && ctx.method !== 'GET') {
      return;
    }

    if (ctx.body !== null || ctx.status !== 404) {
      return;
    }

    try {
      await send(ctx, ctx.path, opts);
    } catch (err) {
      if (err.status !== 404) {
        throw err;
      }
    }
  }

}

module.exports = statics;

