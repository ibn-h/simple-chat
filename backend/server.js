import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import http from "http";

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocketServer({ server });

wsServer.on("connection", (socket) => {
  console.log("New WebSocket connection established");

  socket.onmessage = (message) => {
    console.log("Received message:", message.data);
  };
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
