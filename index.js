// make connection to websocket server
let ws = new WebSocket('ws://localhost:3000/')
ws.onopen = function () {
    ws.send("Hi, this is http client from index");
}

// when received message from websocket, display the message
ws.onmessage = function (message) {
    // open web concole with F12 to see this message
    console.log("Client http: Received: '" + message + "'");
    let msg = message.data.toString();
    console.log("message.data from websocket: " + msg)
}

/************************************************************************/
function sendMessage() {
    ws.send("message title", { data: "hi" })
}
