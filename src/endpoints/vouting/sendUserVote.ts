import { Server, Socket } from "socket.io";
import { getRoom } from "../../rooms";
import { getUser } from "../../users";

const sendUserVote = (socket: Socket, io: Server) => {
  socket.on('sendUserVote', ({userID, value}, callback) => {
    const {user} = getUser(userID);
    if(!user) {
      return callback(JSON.stringify({
        status: 404,
        message: 'User not found!',
      }));
    }
    const {roomObj, errorRoom} = getRoom(user.getRoom());
    if(roomObj) {
      const results = roomObj.getMemberVote().memberVoteResult;
      const userResult = results.find(result => result.userId === userID);
      if(userResult){
        userResult.value = value
      } else {
        results.push({value, userId: userID});
      }
    } else {
      return callback(JSON.stringify({
        status: 404,
        message: errorRoom,
      }));
    }
    console.log(roomObj, value);
    const {isAutoCardFlipping, isTimer, timeMin, timeSec} = roomObj.getGameSettings();
    if(isAutoCardFlipping) {
      const members = roomObj.getPlayers();
      if(members.length === roomObj.getMemberVote().memberVoteResult.length){
        if(isTimer){
          console.log('1');
          roomObj.getMemberVote().timer.stopTimer();
          roomObj.getMemberVote().timer.setMinutes(parseInt(timeMin, 10));
          roomObj.getMemberVote().timer.setSeconds(parseInt(timeSec, 10));
        }
        roomObj.makeStat();
        io.in(user.getRoom()).emit('getVoteResults', roomObj);
      }
    }
    callback(JSON.stringify({
      status: 200,
    }));
  })
}

export default sendUserVote;