const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer(); // 生成一个renderer
const server = require('express')();

// 创建一个vue实例
const app = new Vue({
    template: '<h1>hello {{name}}</h1>',
    data: function() {
        return {
            name: 'world'
        }
    }
});

// 与服务器集成
server.get('*', (require, res) => {
    // 将 Vue 实例渲染为 HTML
    renderer.renderToString(app, (err, html) => {
        if(err) {
            res.status(500).end('Internal Server Error');
            return;
        }
        console.log(html);
        res.end(html);
    })
})

server.listen(8080);



