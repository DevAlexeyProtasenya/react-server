import { Server, Socket } from "socket.io";
import { Timer } from "../entyties/Timer";
import { getRoom } from "../rooms";

const startTimer = (socket: Socket, io: Server) => {
  socket.on('startTimer', ({ roomID }, callback) => {
    const {roomObj} = getRoom(roomID);
    if (roomObj) {
      const seconds = parseInt(roomObj.getGameSettings().timeSec, 10);
      const minute = parseInt(roomObj.getGameSettings().timeMin, 10);
      const timer = new Timer (minute, seconds);
      io.in(roomID).emit('startTimer');
      return callback(JSON.stringify({
        message: timer.getTime(),
        status: 200,
      }));
    }
    return callback(JSON.stringify({
      message: 'Room not found!',
      status: 404,
    }));
  })
};

export default startTimer;