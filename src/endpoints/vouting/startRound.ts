import { Server, Socket } from "socket.io";
import { MemberVoteStatus } from "../../entyties/MemberVote";
import { getRoom } from "../../rooms";

const startRound = (socket: Socket, io: Server) => {
  socket.on('startRound', ({roomID, currentIssue}, callback) => {
    const {roomObj, errorRoom} = getRoom(roomID);
    if(roomObj){
      roomObj.getMemberVote().currentIssue = currentIssue;
      roomObj.getMemberVote().memberVoteResult = [];
      roomObj.getMemberVote().status = MemberVoteStatus.IN_PROGRESS;
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

export default startRound;