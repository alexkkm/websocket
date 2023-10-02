# README.md of this project:

## How to run this project?
1. please installed the node package by:
```
npm i
```
2. Run the following commands:
```
node webSocketServer.js
```
3.  Open the browser with localhost port 8080:
http://localhost:8080/

## Notes:

1. some code has been label as comment, since there is a better code or function that can replace it. 
eg: ws.onmessage()->ws.addEventListener()


## Code Explanation:
1. The application creates 3 servers seperately when it starts:
http Server (Express Server), WebSocket Server and TCP Server.
2. HTTP server serve for responding web page request with sending the index.html file, http server created and serve with Express application and listening on PORT 8080. It will act as a middlewear that send the message from web page to the web socket server or receive web socket server messages and display messages into web page.
3. Web socket server serve for listening connections from http server and tcp server, listening on PORT 3000. When a client connects, sends a message or disconnects, it response with this event and send the corresponding message to the client.
4. TCP server (serve as a middleware server in the real project) listen on PORT 4009, it will send the message to web socket server or receieve web socket server message.

