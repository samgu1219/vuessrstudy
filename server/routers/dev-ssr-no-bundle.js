const Router = require('koa-router');
const axios = require('axios');
const path = require('path');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const VueServerRender = require('vue-server-renderer');
const fs = require('fs');

const serverRender = require('./server-render');
const serverConfig = require('../../build/webpack.config.server');

const serverCompiler = webpack(serverConfig);

const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;
const NativeModule = require('module');
const vm = require('vm');

let  bundle;
serverCompiler.watch({},(err,stats)=>{
  if(err) throw err;
  stats = stats.toJson();
  stats.errors.forEach(err => {console.log(err)});
  stats.warnings.forEach(err => {console.log(err)});
  // console.log(stats);

  const bundlePath = path.join(
    serverConfig.output.path,
    'server-entry.js'
  );

  try {
    const m = {
      exports:{}
    }
    const bundleStr = mfs.readFileSync(bundlePath,'utf-8')
    const warapper = NativeModule.wrap(bundleStr);
    const script = new vm.Script(warapper, {
      filename:'server-entry.js',
      displayErrors:true
    });
    const result = script.runInThisContext();
    result.call(m.exports,m.exports, require,m);
    bundle = m.exports.default;
  } catch(err){
    console.log('compile js error',err);
  };

  // console.log(bundle);
  console.log('new bundle generated');
});

const bundleSSR = async(ctx)=>{
  console.log('++++++++++++++++++++ctx.path');
  if(!bundle) {
    ctx.body = '亲，别着急，等一下'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  );
  const clientManifest = clientManifestResp.data;
  // console.log('[clientManifest]',clientManifest);

  const template = fs.readFileSync(
    path.join(__dirname,'../server.template.ejs'),
    'utf-8'
  );

  const renderer = VueServerRender.createBundleRenderer(bundle,{
    inject:false,
    clientManifest
  })
  await serverRender(ctx,renderer,template)
}

const router = new Router();
router.get('*',bundleSSR)
module.exports=router