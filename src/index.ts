import express from 'express';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from 'cors';
import login from './endpoints/login';
import createRoom from './endpoints/createRoom';
import sendMessage from './endpoints/sendMessage';
import disconnect from './endpoints/disconnect';
import checkRoom from './endpoints/checkRoom';
import deleteUserFromRoom from './endpoints/deleteUserFromRoom';
import removeRoom from './endpoints/removeRoom';
import updateRoom from './endpoints/updateRoom';
import startTimer from './endpoints/startTimer';
import getRoomEP from './endpoints/getRoomEP';
import getUserEP from './endpoints/getUserEP';
import getUsersEP from './endpoints/getUsersEP';

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
  startTimer(socket, io);
  getRoomEP(socket);
  getUserEP(socket);
  getUsersEP(socket);
})

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

httpServer.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
})