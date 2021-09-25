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
    const {isTimer, timeMin, timeSec} = roomObj.getGameSettings();
    if(isTimer){
      roomObj.getMemberVote().timer.stopTimer();
      roomObj.getMemberVote().timer.setMinutes(parseInt(timeMin, 10));
      roomObj.getMemberVote().timer.setSeconds(parseInt(timeSec, 10));
    }
    callback(JSON.stringify({
      status: 200,
    }))
  })
}

export default saveStat;