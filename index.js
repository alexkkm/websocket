/*
//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket('ws://localhost:8000')

//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
ws.onopen = () => {
    console.log('open connection')
}

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
    console.log('close connection')
}

//接收 Server 發送的訊息
ws.onmessage = event => {
    console.log("Received" + event)
    document.getElementById('time').innerHTML = event.data
}

ws.onmessage = function (e) {
    console.log("ClientSide: TCP Received: '" + e.data + "'");
    document.getElementById('time').innerHTML = e.data
}

*/