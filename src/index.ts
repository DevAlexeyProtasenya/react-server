import express from 'express';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from 'cors';
import login from './endpoints/authorization/login';
import createRoom from './endpoints/authorization/createRoom';
import sendMessage from './endpoints/sendMessage';
import disconnect from './endpoints/authorization/disconnect';
import checkRoom from './endpoints/authorization/checkRoom';
import deleteUserFromRoom from './endpoints/scrumMaster/deleteUserFromRoom';
import removeRoom from './endpoints/scrumMaster/removeRoom';
import updateRoom from './endpoints/updateRoom';
import startTimer from './endpoints/startTimer';
import getDataForReload from './endpoints/getingData/getDataForReload';
import getUserEP from './endpoints/getingData/getUserEP';
import getUsersEP from './endpoints/getingData/getUsersEP';
import sendUserVote from './endpoints/vouting/sendUserVote';
import saveStat from './endpoints/vouting/saveStat';
import startRound from './endpoints/vouting/startRound';

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
  getDataForReload(socket);
  getUserEP(socket);
  getUsersEP(socket);
  sendUserVote(socket, io);
  saveStat(socket, io);
  startRound(socket, io);
})

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

httpServer.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
})