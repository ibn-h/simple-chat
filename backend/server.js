import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import http from "http";

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocketServer({ server });

function broadCast(data) {
  wsServer.clients.forEach((client) => {
    if (!client.readyState) {
      return;
    }

    client.send(data);
  });
}

wsServer.on("connection", (socket, req) => {
  const ip = req.socket.remoteAddress.replace(/^::ffff:/, "");
  socket.username = "Anonymous";

  console.log(
    `Client connected from IP: ${ip} at ${new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  );

  socket.on("message", (raw) => {
    const data = JSON.parse(raw);

    switch (data.type) {
      case "setUsername":
        socket.username = data.username;
        console.log(`Set username ${data.username} for ${ip}`);

        break;
      default:
        console.log("Unknown message type: ", data.type);
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
