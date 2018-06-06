const Router = require('koa-router');

const apiRouter = new Router({prefix:'/api'});

const successResponse = (data)=>{
  return {
    success:true,
    data
  }
}

apiRouter.get('/todos', async(ctx)=>{
  const todos = await ctx.db.getAllTodos();
  ctx.body = successResponse(todos);
})
.post('/todo',async(ctx)=>{
  const data = await ctx.db.addTodo(ctx.request.body);
  console.log('======>ctx.request.body',ctx.request.body);
  ctx.body = successResponse(data)
})
.put('/todo/:id',async(ctx)=>{
  console.log('======>ctx.params.id',ctx.params.id);
  console.log('======>ctx.request.body',ctx.request.body);
  const data = await ctx.db.updateTodo(ctx.params.id,ctx.request.body);
  ctx.body = successResponse(data);
})
.delete('/todo/:id',async(ctx)=>{
  console.log('======>ctx.params.id',ctx.params.id);
  const data = await ctx.db.deleteTodo(ctx.params.id);
  ctx.body = successResponse(data);
});

module.exports = apiRouter