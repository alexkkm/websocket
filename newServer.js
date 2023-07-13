// basic npm package
var http = require('http');
const WebSocket = require('ws');
var events = require('events');
const express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const fs = require("fs");
const tcpServer = require("./tcpServer.js")

// file import
//const configFile = "./setting/config.json";
//let config = require(configFile);

//Express setting
const app = express();
//app.use(express.static("views"));
//app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: false }));
//app.set('view engine', 'html');

// routing: perfromed by sending response when client requiring 
app.get('/', (req, res) => {
    console.log("send file: index.html to client")
    return res.status(200).sendFile(`${__dirname}/index.html`);
});

app.get('/main', jsonParser, (req, res) => {
    console.log('main, also send file: index.html to client');
    res.sendFile(__dirname + '/index.html');
});



// create http server with port 8080
const httpPort = 8080;
var httpServer = http.createServer(app);

// app
app.on('connect', (socket) => {
    console.log('a web client connected');
    socket.on('disconnect', () => {
        console.log('web client disconnected');
    });
});

// httpServer, or called web server
httpServer.listen(httpPort, () => {
    console.log('http server is listening on ' + httpPort);
    httpServer.on('closed', () => {
        console.log('http server closed')
    });
}); //open the httpServer using localhost:8080/





// Creating a new web socket server with PORT 3080
const wsServer = new WebSocket.Server({
    port: 3000
});

wsServer.on('connection', function (socket) {

    // Some feedback on the console
    console.log("A client just connected to wsServer");
    socket.send("message")

    // Attach some behavior to the incoming socket
    socket.on('message', function (msg) {
        console.log("Server: Received message from client: " + msg);

        let temp = msg.toString(); //convert the object to string 
        //temp = temp.substring(1, temp.length-1); //and delete the quotes after convertion
        console.log(temp);

        // Broadcast that message to all connected clients
        wsServer.clients.forEach(function (client) {
            client.send(msg);
        });


    });

    socket.on('close', function () {
        console.log('Client disconnected');
    })

});


