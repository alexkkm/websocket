const net = require('net');
const WebSocket = require('ws');

// create a new web socket 
const serverAddress = "ws://localhost:3000/";
const ws = new WebSocket(serverAddress);
const tcpPort = 4008;


// create a tcp server using net
const tcpServer = net.createServer((socket) => {
    console.log('a tcp client connected');

    console.log(socket.address().address);
    socket.on('data', (msg) => {
        console.log(msg.toString());
        //receiveMsg(socket, msg);
    });

    socket.on('close', () => {
        console.log('tcp client closed');
    });
});

// bind tcp server listening to port 4008
tcpServer.listen(tcpPort, () => {
    console.log('tcp server is listening on ' + tcpPort);

    tcpServer.on('close', () => {
        console.log('tcp server closed');
    });
});

// when connected to websocket, send message back to websocket
ws.onopen = function () {
    ws.send('Hi, this is client TCP.');
};

// when received message from websocket, display the message
ws.onmessage = function (message) {
    console.log("Client TCP: TCP Received: '" + message + "'");
    let msg = message.data.toString();
    console.log("message.data from webSocket: " + msg)
}