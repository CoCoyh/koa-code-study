/**
 * 日志
 * @param {*} ctx 
 * @param {*} next 
 */
const logger = async function (ctx, next) {
  let res = ctx.res;
  // 拦截操作请求request
  console.log(`<-- ${ctx.method} ${ctx.url}`);
  await next();

  // 拦截操作响应request
  res.on('finish', () => {
    console.log(`--> ${ctx.method} ${ctx.url}`);
  });
}

module.exports = logger;
