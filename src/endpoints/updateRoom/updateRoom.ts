import { Server, Socket } from "socket.io";
import { Timer } from "../../entyties/Timer";
import { MemberVote, MemberVoteStatus } from "../../entyties/MemberVote";
import { GameState } from "../../entyties/Room";
import { changeRoom } from "../../rooms";

const updateRoom = (socket: Socket, io: Server) => {
  socket.on('updateRoom', ({ room }, callback) => {
    const {roomObj, errorRoom} = changeRoom(room);
    if (errorRoom) {
      return callback(JSON.stringify({
        status: 404,
        message: 'Room not found!',
      }));
    }
    if(roomObj.getState() === GameState.PLAYING && !roomObj.getMemberVote().timer){
      if(roomObj.getGameSettings().isTimer){
        const minutes = parseInt(roomObj.getGameSettings().timeMin, 10);
        const seconds = parseInt(roomObj.getGameSettings().timeSec, 10);
        roomObj.getMemberVote().timer = new Timer(minutes, seconds);
      }
    }
    io.in(roomObj.getRoomID()).emit('updatedRoom', roomObj);
    return callback(JSON.stringify({
      status: 200,
    }));
  })
};

export default updateRoom;