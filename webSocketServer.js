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
    console.log("ws: A client just connected to wsServer");
    // Encode the JSON into sendable string and send it to client
    socket.send(JSON.stringify({ title: "message", info: "Welcome" }))

    // when client send message, display that message
    socket.addEventListener("message", (event) => {
        console.log("ws: Received message from client: " + event.data)
    })

    //*  replaced by addEventListener()
    /*
    // when client send message, display that message
    socket.on('message', function (rawdata) {
        console.log("ws: Received message from websocket client: " + rawdata);
    });
    */

    // when client is disconnect, notify a message in console
    socket.on('close', function (socket) {
        console.log('ws: Websocket client disconnected');
    })

});

