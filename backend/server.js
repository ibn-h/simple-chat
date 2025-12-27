import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import http from "http";

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocketServer({ server });

wsServer.on("connection", (socket) => {
  console.log("New WebSocket connection established");
});

wsServer.on("message", (message) => {
  console.log("Received message:", message);

  // Broadcast message to all connected clients
  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
