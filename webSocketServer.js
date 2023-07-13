// basic npm package
var http = require('http');
const WebSocket = require('ws');
const express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const tcpServer = require("./tcpServer.js")

// useful package maybe use later
var events = require('events');
const fs = require("fs");
// file import
//const configFilePath = "./setting/config.json";
//let config = require(configFilePath);

/************************************************************************/

// Express setting

// create express app
const app = express();
//  app.use() is to indicate the path of files that will be use by the express
// need to indicate the file path 
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: false }));

//! Not running with unknown reason
app.on('connect', (socket) => {
    console.log('A web client connected');
    socket.on('disconnect', () => {
        console.log('A web client disconnected');
    });
});

// routing: perfromed by sending response when client requiring 
app.get('/', (req, res) => {
    console.log("http server sending file: index.html to client:localhost:8080/");
    return res.status(200).sendFile(`${__dirname}/index.html`);
});

app.get('/main', jsonParser, (req, res) => {
    console.log("main, also send file: index.html to client:localhost:8080/");
    res.sendFile(__dirname + '/index.html');
});


/************************************************************************/

// Http Server Setting

// create http server with port 8080
const httpPort = 8080;
var httpServer = http.createServer(app);


// httpServer, or called web server
httpServer.listen(httpPort, () => {
    console.log('http server is listening on ' + httpPort);
    httpServer.on('closed', () => {
        console.log('http server closed')
    });
}); //open the httpServer using localhost:8080/

/************************************************************************/

// WebServer Setting

// Creating a new web socket server with PORT 3080
const wsServer = new WebSocket.Server({
    port: 3000
});

// when a client connected to websocket Server,do the followings:
wsServer.on('connection', function (socket) {

    // Some feedback on the console
    console.log("A websocket client just connected to wsServer");
    socket.send("message", { data: "Welcome" })

    // Attach some behavior to the incoming socket
    socket.on('message', function (msg) {
        console.log("Websocket Server: Received message from websocket client: " + msg);
        /*
        let temp = msg.toString(); //convert the object to string 
        console.log(temp);

        // Broadcast that message to all connected clients
        wsServer.clients.forEach(function (client) {
            client.send(msg);
        });
        */
    });

    socket.on('close', function (socket) {
        console.log('Websocket client disconnected');
    })

});
