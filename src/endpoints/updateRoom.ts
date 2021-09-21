import { Server, Socket } from "socket.io";
import { MemberVote, MemberVoteStatus } from "../entyties/MemberVote";
import { GameState } from "../entyties/Room";
import { changeRoom } from "../rooms";

const updateRoom = (socket: Socket, io: Server) => {
  socket.on('updateRoom', ({ room }, callback) => {
    const {roomObj, errorRoom} = changeRoom(room);
    if (errorRoom) {
      return callback(JSON.stringify({
        status: 404,
        message: 'Room not found!',
      }));
    }
    console.log('first');
    if(roomObj.getState() === GameState.PLAYING && !roomObj.getMemberVote){
      console.log('second');
      const memberVote = {
        currentIssue: 0,
        status: MemberVoteStatus.BEFORE_START,
        memberVoteResult: [],
      } as MemberVote;
      roomObj.setMemberVote(memberVote);
    }
    io.in(roomObj.getRoomID()).emit('updatedRoom', roomObj);
    return callback(JSON.stringify({
      status: 200,
    }));
  })
};

export default updateRoom;