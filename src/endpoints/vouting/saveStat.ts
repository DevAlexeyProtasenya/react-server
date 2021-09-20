import { Server, Socket } from "socket.io";
import { getRoom } from "../../rooms";

const saveStat = (socket: Socket, io: Server) => {
  socket.on('saveStat', ({roomID}, callback) => {
    const {roomObj, errorRoom} = getRoom(roomID);
    if(!roomObj) {
      return callback(JSON.stringify({
        status: 404,
        message: errorRoom,
      }));
    }
    roomObj.makeStat();
    io.in(roomID).emit('getVoteResults', roomObj);
    callback(JSON.stringify({
      status: 200,
    }))
  })
}

export default saveStat;