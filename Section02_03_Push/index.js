const http = require('http');
const WebSocketServer = require('websocket').server;

let connections = [];   // 클라이언트 정보를 담는 배열

const httpServer = http.createServer(); // http 서버 생성

const webSocket = new WebSocketServer({"httpServer": httpServer});  // 웹소켓 서버 생성

httpServer.listen(8080, () => { // http 웹 소켓 서버를 8080 포트로 연다. 
    console.log('Server is listening on port 8080');
});

webSocket.on("request", request => {
    // 클라이언트의 요청을 수락한다.
    const connection = request.accept(null, request.origin);

    // 클라이언트로부터 메시지를 받으면 모든 클라이언트에게 메시지를 전달한다.
    connection.on("message", message => {  
        connections.forEach((c) => {
            if (!c.connected) {
                connections.splice(connections.indexOf(c), 1);
                return;
            }
            c.send(`User${connection.socket.remotePort} says: ${message.utf8Data}`);
        });
    });

    // 연결된 클라이언트를 배열에 추가한다.
    connections.push(connection);
    // 새로운 클라이언트가 접속했음을 모든 클라이언트에게 알린다.
    connections.forEach(c => c.send(`User${connection.socket.remotePort} has joined the chat`));
});