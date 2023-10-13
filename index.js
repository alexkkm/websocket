// Create websocket server instance, bind to port 3000
let ws = new WebSocket('ws://localhost:3000/')

// When connected to websocket, send message back to websocket
ws.onopen = () => {
    ws.send(JSON.stringify({ category: "system", info: "Hi, this is index" }));
}

// When received message from websocket, do the followings:
ws.addEventListener("message", (event) => {
    // translate the "event.data" into JSON format, name as "msg"
    var msg = JSON.parse(event.data);

    // identify the message "category"
    // If it is "system" message,
    if (msg.category == "system") {
        console.log("index: Received message from Websocket Server: " + msg.info);
    }
    // If it is "time" message,
    if (msg.category == "time") {
        // save the time from "event.data" as "dataObject"
        var dataObject = msg.info;
        // replcae "timeBlock" content with "dataObject"
        var timeBlock = document.getElementById("time");
        timeBlock.innerHTML = dataObject;
    }
})

//** Same as ws.addEventListener()**//
/*
// when received message from websocket, display the message
ws.onmessage = (event) => {
    // open web concole with F12 to see this message
    var dataObject = JSON.parse(event.data);
    console.log("index: Received message from Websocket Server: " + dataObject);
}
*/

/************************************************************************/
// In case the script "index.js" is put before the <body> in "index.html", need to include the "addEventListener()" into "window.onload=function(){}" 
window.onload = function () {   // In current situation, actually no need to use window.onload(), since the <script> is render after the <body> has been rendered

    // Function for sending "inputField" text to websocket
    document.getElementById("submitTextButton").addEventListener("click", function () {
        let text = document.getElementById("inputField").value;
        ws.send(JSON.stringify({ category: "message", info: text.toString() }));
    });

}


