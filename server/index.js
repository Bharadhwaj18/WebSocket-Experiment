const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const http = require("http");

// Applying middleware
app.use(cors());

// Creating a server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// To listen to events cd ..sent from the client side .....it is just like get request
io.on("connection", (socket) => {
  console.log("Connection with ID: " + socket.id);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("Server is Running");
});
