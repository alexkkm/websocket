// make connection to websocket server
let ws = new WebSocket('ws://localhost:3000/')

// when connected to websocket, send message back to websocket
ws.onopen = () => {
    ws.send(JSON.stringify({ title: "message", info: "Hi, this is http client from index" }));
}

// when received message from websocket, display the message
ws.addEventListener("message", (event) => {
    console.log("Client http: Received message from Websocket Server: " + event.data);
})

/*
// when received message from websocket, display the message
ws.onmessage = event => {
    // open web concole with F12 to see this message
    console.log("Client http: Received message from Websocket Server: " + event);
    var dataObject = JSON.parse(event.data);
    var name = dataObject.name;
    console.log("message.data from websocket: " + name)
}
*/

/************************************************************************/
function sendMessage() {
    ws.send(JSON.stringify({ title: "message", data: "hi" }))
}
