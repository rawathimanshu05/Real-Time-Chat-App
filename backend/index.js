const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

require("./Database/Db");
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*", // you can restrict to your frontend URL
    methods: ["GET", "POST"]
  }
});


const login = require("./Routes/Chat.Route");
// const chat = require("./Routes/Chat.Route");

app.use(express.json());
app.use(cors())
app.use("/api", login);
// app.use("/api", chat);;

let users = {};

io.on('connection', (socket) => {
  // console.log('A user connected');

  socket.on('new-user', (username) => {
    users[socket.id] = username;
    io.emit('user-list', Object.values(users));
    socket.broadcast.emit('user-joined', username);
  });

  socket.on('send-chat-message', ({ sender, message }) => {
    io.emit('chat-message', { sender, message });
  });

  socket.on('typing', (username) => {
    socket.broadcast.emit('user-typing', username); // notify others
  });

  socket.on('stop-typing', (username) => {
    socket.broadcast.emit('user-stop-typing', username);
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    delete users[socket.id];
    io.emit('user-list', Object.values(users));
    socket.broadcast.emit('user-left', username);
  });
});


const port = process.env.PORT;
server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
