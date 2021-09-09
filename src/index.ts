import express from 'express';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from 'cors';
import { addRoom, deleteRoom, getRoom } from './rooms';
import { addUser, deleteUser, getUsers, getUser } from './users';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer)
const PORT = process.env.PORT || 5000

app.use(cors())

io.on('connection', (socket: Socket) => {
  
  socket.on('login', ({ name, lastName, jobPosition, avatar, role, room }, callback) => {
    console.log(`Connecting user ${name} ${lastName} to room ${room} `)
    const { user } = addUser(socket.id, name, role, room, lastName, avatar, jobPosition);
    const { roomObj, errorRoom } = getRoom(room);
    if (errorRoom) {
      deleteUser(user.getId());
      return callback(JSON.stringify({
        status: 404,
        typeError: "Data not found",
        message: errorRoom,
      }));
    }
    socket.join(user.getRoom());
    socket.in(user.getRoom()).emit('notification', { title: 'Someone\'s here', description: `${user.getName()} just entered the room` });
    io.in(user.getRoom()).emit('users', getUsers(user.getRoom()));
    console.log(user);
    callback(JSON.stringify({
      roomObj,
      status: 200,
    }));
  })

  socket.on('createRoom', ({ name, lastName, jobPosition, avatar, role }, callback) => {
    const { roomObj } = addRoom();
    const { user } = addUser(socket.id, name, role, roomObj.getId(), lastName, avatar, jobPosition);
    if (!user.getId()) {
      return callback(JSON.stringify({
        status: 500,
        typeError: 'Bad request',
        message: 'Check the request!',
      }));
    };
    socket.join(user.getRoom())
    socket.in(user.getRoom()).emit('notification', { title: 'Someone\'s here', description: `${user.getName()} just entered the room` })
    io.in(user.getRoom()).emit('users', getUsers(user.getRoom()));
    console.log(user);
    callback(JSON.stringify({
      roomObj,
      status: 200,
    }))
  })

  socket.on('sendMessage', message => {
    const { user } = getUser(socket.id)
    io.in(user.getRoom()).emit('message', { user: user.getName(), text: message });
  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id)
    if (user) {
      io.in(user.getRoom()).emit('notification', { title: 'Someone just left', description: `${user.getName()} just left the room` })
      io.in(user.getRoom()).emit('users', getUsers(user.getRoom()))
    }
  })
})

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

httpServer.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
})