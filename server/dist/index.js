"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
// starts server instance on http://localhost:8080
const wss = new ws_1.default.Server({ port: 8080 });
// waits for connection to be established from the client
// the callback argument ws is a unique for each client
wss.on("connection", ws => {
    // runs a callback on message event
    ws.on("message", data => {
        // sends the data to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(data);
            }
        });
    });
});
//# sourceMappingURL=index.js.map