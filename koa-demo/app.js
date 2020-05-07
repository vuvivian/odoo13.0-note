/**
 * Created by vuvivian on 2019/12/15 
 */

let Koa = require('koa'),
    Router = require('koa-router');

let app = new Koa(),
    router = new Router();

// 配置路由 ctx:包含request，response等上下文信息
router
    .get('/',(ctx)=>{
        ctx.body = '首页'  // 返回数据，相当于原生的res.writeHead()  res.end()
    })
    .get('/news',async(ctx)=>{
        ctx.body = "这是一个新闻页面"
    })

// 中间件

//express写法
// app.use(function(req,res){
//     res.send('返回数据')
// })

// app.use( async(ctx)=>{ctx.body="hello, koa2.11"})
app.use(router.routes())  // 启动路由
app.use(router.allowedMethods()) //可选，放在router.routes()之后,此时根据cts.status配置response响应头

// 监听端口
app.listen(3000);

