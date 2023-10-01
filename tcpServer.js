const net = require('net');
const WebSocket = require('ws');

const tcpPort = 4008;

// create a tcp server instance using net
const tcpServer = net.createServer((socket) => {
    console.log('a tcp client connected');

    console.log(socket.address().address);

    // Display the message when receive from tcp client
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

/****************************************************************/

// create a websocket instance, register as web socket client
const serverAddress = "ws://localhost:3000/";
const ws = new WebSocket(serverAddress);

// when connected to websocket, send message back to websocket
ws.onopen = function () {
    ws.send(JSON.stringify({ title: "message", info: "Hi, this is TCP" }));
};

/*  
//* replaced by addEventListener()
// when received message from websocket, display the message
ws.onmessage = function (rawdata) {
    // raw data
    console.log("Raw Data:'" + rawdata + "'");
    // parse raw data to JSON
    var dataObject = JSON.parse(rawdata.data);
    console.log("Client TCP: TCP Received: '" + dataObject.toString() + "'");

    var info = dataObject.info;
    console.log("event.info from websocket: " + info)
}
*/

// Since this is tcpServer, so we identify this file is a client of websocket, and send back to message via websocket connection to websocket server
ws.addEventListener("message", (event) => {
    console.log("TCP: Received message from Websocket Server: " + event.data);
})
