const express = require('express');
const app = express();
require('dotenv').config();
const chats = require('./data/data');
const connectDB = require('./db/connectDb');
const authRouter = require('./routes/auth.route')
const messageRouter = require('./routes/messages.route')
const cors = require('cors')
const socket = require('socket.io')

app.use(express.json());
app.use(cors())

app.get('/api/chat', (req, res) => {
  const singleChat = chats.find((chat) => chat._id === "617a077e18c25468bc7c4dd4")
  res.send(singleChat)
});

// app.use("/api/chat")
const port = process.env.PORT || 4000;

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)

connectDB()
const server = app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id)
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to)
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message )
    }
  })
})
