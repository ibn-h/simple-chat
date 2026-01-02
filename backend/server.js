import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import http from "http";

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocketServer({ server });

function broadCast(data, sender) {
  wsServer.clients.forEach((client) => {
    if (!client.readyState) {
      return;
    }

    if (client == sender) {
      console.log("Skipping sender");
      return;
    }

    console.log("Broadcasting to: ", client.username);
    client.send(JSON.stringify(data));
  });
}

wsServer.on("connection", (socket, req) => {
  // const ip = req.socket.remoteAddress.replace(/^::ffff:/, "");
  socket.username = "Anonymous";

  console.log(
    `Client connected from IP: ${"Unknown"} at ${new Date().toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`
  );

  socket.on("message", (raw) => {
    try {
      const data = JSON.parse(raw);

      switch (data.type) {
        case "setUsername":
          socket.username = data.username;
          console.log(`Set username ${data.username}`);

          break;
        case "message":
          console.log(`Message from ${socket.username}: ${data.text}`);
          broadCast(
            {
              type: "message",
              text: data.text,
              username: socket.username,
            },
            socket
          );
          break;
        default:
          console.log("Unknown message type: ", data.type);
      }
    } catch (error) {
      console.error("Error parsing message: ", error);
    }
  });

  socket.onclose = () => {
    console.log("Disconnected");
  };
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
