// make connection to websocket server
let ws = new WebSocket('ws://localhost:3000/')
ws.onopen = () => {
    ws.send(JSON.stringify({ title: "message", info: "Hi, this is http client from index" }));
}

// when received message from websocket, display the message
ws.onmessage = event => {
    // open web concole with F12 to see this message
    console.log("Client http: Received: '" + event + "'");
    var dataObject = JSON.parse(event.data);
    var name = dataObject.name;
    console.log("message.data from websocket: " + name)
}

/************************************************************************/
function sendMessage() {
    ws.send("message", { data: "hi" })
}
