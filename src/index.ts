import express from 'express';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from 'cors';
import { addUser, deleteUser, getUsers, getUser } from './users';
import login from './endpoints/login';
import createRoom from './endpoints/createRoom';
import sendMessage from './endpoints/sendMessage';
import disconnect from './endpoints/disconnect';
import checkRoom from './endpoints/checkRoom';
import deleteUserFromRoom from './endpoints/deleteUserFromRoom';
import removeRoom from './endpoints/removeRoom';
import updateRoom from './endpoints/updateRoom';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer)
const PORT = process.env.PORT || 5000

app.use(cors())

io.on('connection', (socket: Socket) => {
  login(socket, io);
  createRoom(socket, io);
  checkRoom(socket, io);
  deleteUserFromRoom(socket, io);
  sendMessage(socket, io);
  disconnect(socket, io);
  removeRoom(socket, io);
  updateRoom(socket, io);
})

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

httpServer.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
})