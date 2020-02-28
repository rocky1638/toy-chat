"use strict";
exports.__esModule = true;
var ws_1 = require("ws");
// starts server instance on http://localhost:8080
var wss = new ws_1["default"].Server({ port: 8080 });
// waits for connection to be established from the client
// the callback argument ws is a unique for each client
wss.on("connection", function (ws) {
    // runs a callback on message event
    ws.on("message", function (data) {
        // sends the data to all connected clients
        wss.clients.forEach(function (client) {
            if (client.readyState === ws_1["default"].OPEN) {
                client.send(data);
            }
        });
    });
});
