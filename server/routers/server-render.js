const ejs = require('ejs');

module.exports = async(ctx,renderer,template)=>{
  ctx.headers['Content-Type'] = 'text/html';

  const context = {url:ctx.path}
  // console.log('======>context', context);
  try{
    const appString = await renderer.renderToString(context)
    console.log('======>appString',appString);
    console.log('======>context',context);
    console.log('======>renderStyles',context.renderStyles());
    console.log('======>renderScripts',context.renderScripts());
    console.log('======>renderState',context.renderState());
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