const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-body');

const app = new Koa();
const apiRouter = require('./routers/api');
const createDb = require('./db/db');
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)

app.use(bodyParser());
// 开发环境
// const pageRouter = require('./routers/dev-ssr');
const isDev = process.env.NODE_ENV ==='development';

app.use(async(ctx,next)=>{
  try{
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch(err) {
    console.log(err);
    ctx.status = 500;
    if(isDev) {
      ctx.body = err.message
    } else {
      ctx.body = `please try again later`
    }
  }
});

app.use(async(ctx,next)=>{
  ctx.db = db;
  await next();
});

let pageRouter;
if(isDev) {
  pageRouter = require('./routers/dev-ssr');
} else {
  pageRouter = require('./routers/ssr');
  app.use(require('koa-static')(path.join(__dirname,'../dist/public')))
}

app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '3333';

app.listen(PORT,HOST,()=>{
  console.log(`server is listening on ${HOST}:${PORT}`);
});