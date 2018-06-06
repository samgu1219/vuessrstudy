const ejs = require('ejs');

module.exports = async(ctx,renderer,template,bundle)=>{
  ctx.headers['Content-Type'] = 'text/html';

  const context = {url:ctx.path}
  console.log('======>context', context);
  try{
    const app = await bundle(context);
    // const appString = await renderer.renderToString(context)
    const appString = await renderer.renderToString(app, context)
    console.log('======>appString',appString);
    console.log('======>context',context);
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts:context.renderScripts(),
      initalState: context.renderState()
    });
    console.log("======>html", html);
    ctx.body = html;
  }catch(err){
    console.log('render error',err);
    throw err;
  };
}