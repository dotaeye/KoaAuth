'use strict';

const Koa = require('koa');
const body = require('koa-body'); // body parser
const compose = require('koa-compose'); // middleware composer
const compress = require('koa-compress'); // HTTP compression
const config = require('./config');

const app = new Koa();

app.use(compress({}));

// x-response-time

app.use(async function(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async function(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(body());


// set signed cookie keys for JWT cookie & session cookie
// TODO 目前并不知道这个有什么用暂时记录下来
// app.keys = ['koa-auth'];


// 同一个网站启动多个子域名时，可以设置一下设置。
// select sub-app (admin/api) according to host subdomain (could also be by analysing request.url);
// separate sub-apps can be used for modularisation of a large system, for different login/access
// rights for public/protected elements, and also for different functionality between api & web
// pages (content negotiation, error handling, handlebars templating, etc).

app.use(async function subApp(ctx, next) {
  // use subdomain to determine which app to serve: www. as default, or admin. or api
  ctx.state.subapp = ctx.hostname.split('.')[0]; // subdomain = part before first '.' of hostname
  // note: could use root part of path instead of sub-domains e.g. ctx.request.url.split('/')[1]
  await next();
});

app.use(async function composeSubapp(ctx) {
  // note no 'next' after composed subapp
  switch (ctx.state.subapp) {
    // case 'admin': await compose(require('./app-admin/app-admin.js').middleware)(ctx); break;
    case 'localhost':
    case 'api':
      await compose(require('./api/startup.js').middleware)(ctx);
      break;
    case 'www':
      await compose(require('./www/startup.js').middleware)(ctx);
      break;
    default:
      // no (recognised) subdomain? canonicalise host to www.host
      // note switch must include all registered subdomains to avoid potential redirect loop
      await compose(require('./api/startup.js').middleware)(ctx);
      // ctx.redirect(
      //   ctx.protocol + '://' + 'www.' + ctx.host + ctx.path + ctx.search,
      // );
      break;
  }
});

/* create server - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

app.listen(process.env.PORT || 3000);
