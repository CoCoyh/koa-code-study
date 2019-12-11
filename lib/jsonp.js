/**
 * 实例代理上下文
 */

 function jsonp(app, opts = {}) {
   let callback = opts.callback || 'callback';
   
   app.context.jsonp = function (obj = {}) {
     let ctx = this;
     if (Object.prototype.toString.call(obj).toLowerCase() === '[object object]') {
       let jsonStr = `${callback}(${JSON.stringify(obj)})`;

       ctx.type = 'text/javascript';

       // 输出jsonp字符串
       ctx.body = jsonStr;
     } else {
       ctx.throw(500, 'result must be a json');
     }
   }
 }

 module.exports = jsonp;