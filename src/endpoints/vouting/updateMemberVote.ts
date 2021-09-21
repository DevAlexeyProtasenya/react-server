import { Server, Socket } from "socket.io";
import { MemberVote } from "../../entyties/MemberVote";
import { getRoom } from "../../rooms";

const updateMemberVote = (socket: Socket, io: Server) => {
  socket.on('updateMemberVote', ({roomID, memberVote}, callback) => {
    const {roomObj, errorRoom} = getRoom(roomID);
    if(roomObj){
      roomObj.setMemberVote(memberVote as MemberVote);
      io.in(roomID).emit('getVoteResults', roomObj);
      return callback(JSON.stringify({
        status: 200,
      }));
    }
    return callback(JSON.stringify({
      status: 404,
      message: errorRoom,
    }));
  });
}

export default updateMemberVote;