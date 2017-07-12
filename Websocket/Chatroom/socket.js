
var url = require('url');
var WebSocket = require('ws');
var WebSocketServer =WebSocket.Server,
    wss = new WebSocketServer({ port: 8888 });

var uuid = require('node-uuid');
var clients = [];

var clientIndex = 1;
wss.on('connection', function (ws,request) {
    var arg = url.parse(request.url,true).query;
    var client_uuid = uuid.v4();
    if(arg.name==''){
        var nickname = "路人" + clientIndex;
    }else{
        var nickname=arg.name
    }
    clientIndex += 1;
    clients.push({ "id": client_uuid, "ws": ws, "nickname": nickname });
    console.log('client [%s] connected', client_uuid);
//连接成功了给前端一个反馈
    var connect_message = nickname + " has connected";
    wsSend("notification", client_uuid, nickname, connect_message);

    ws.on('message', function (message) {
        if (message.indexOf('/nick') === 0) {
            var nickname_array = message.split(' ');
            if (nickname_array.length >= 2) {
                var old_nickname = nickname;
                nickname = nickname_array[1];
                var nickname_message = "Client " + old_nickname + " changed to " + nickname;
                wsSend("nick_update", client_uuid, nickname, nickname_message);
            }
        } else {
            wsSend("message", client_uuid, nickname, message);
        }
    });
    var closeSocket = function(customMessage) {
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].id == client_uuid) {
                var disconnect_message;
                if (customMessage) {
                    console.log('Server has disconnected')
                    disconnect_message = customMessage;
                } else {
                    console.log(nickname + " has disconnected")
                    disconnect_message = nickname + " has disconnected";
                }
                wsSend("notification", client_uuid, nickname, disconnect_message);
                clients.splice(i, 1);
            }
        }
    };
    ws.on('close', function () {
        closeSocket();
    });
    process.on('SIGINT', function () {
        console.log("Closing things");
        closeSocket('Server has disconnected');
        process.exit();
    });
});
function wsSend(type, client_uuid, nickname, message) {
    for (var i = 0; i < clients.length; i++) {
        var clientSocket = clients[i].ws;
        if (clientSocket.readyState === WebSocket.OPEN) {
            clientSocket.send(JSON.stringify({
                "type": type,
                "id": client_uuid,
                "nickname": nickname,
                "message": message
            }));
        }
    }
}
console.log('socket服务启动了！');