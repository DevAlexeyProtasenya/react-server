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

io.on('connection', (socket) => {

  socket.on('login', ({ name, surname, jobPosition, role, room }, callback) => {
    console.log(`Connecting user ${name} ${surname} to room ${room} `)
    const { user, errorUser } = addUser(socket.id, name, surname, room, jobPosition, role);
    if (errorUser) {
      return callback(JSON.stringify({
        status: 409,
        typeError: "Data is already exist",
        message: errorUser,
      }));
  }
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
    callback(JSON.stringify({
      roomObj,
      status: 200,
    }));
  })

  socket.on('createRoom', ({ name, surname, jobPosition, role, }, callback) => {
    const { roomObj } = addRoom();
    const { user, errorUser } = addUser(socket.id, name, surname, roomObj.getId(), jobPosition, role)
    if (errorUser) {
      deleteRoom(roomObj.getId());
      return callback(JSON.stringify({
        status: 409,
        typeError: "Data is already exist",
        message: errorUser,
      }))
    }
    socket.join(user.getRoom())
    socket.in(user.getRoom()).emit('notification', { title: 'Someone\'s here', description: `${user.getName()} just entered the room` })
    io.in(user.getRoom()).emit('users', getUsers(user.getRoom()))
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