// make connection to 
let ws = new WebSocket('ws://localhost:3000/')
ws.onopen = function () {
    ws.send("Hi, this is http client from index");
}
ws.onmessage = function (message) {
    console.log("Client http: Received: '" + message + "'");
    let msg = message.data.toString();
    console.log("message.data from websocket: " + msg)
}

function sendMessage() {
    ws.send("message title", { data: "hi" })
}