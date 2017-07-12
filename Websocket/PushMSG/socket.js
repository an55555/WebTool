var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8888 });
wss.on('connection', function (ws) {
    console.log('client connected');
    var randomMSTime=''
    ws.on('message', function (message) {
        console.log(message);
        randomMSTime=setInterval(function () {
            var hData=Math.floor(Math.random()*6+0);
            console.log(hData)
            ws.send(JSON.stringify(hData))
        },2000)
    });
    ws.on('close', function (message) {
        console.log('关闭连接');
        clearInterval(randomMSTime)
    });
});
console.log('socket服务启动了！');