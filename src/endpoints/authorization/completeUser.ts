import { Server, Socket } from "socket.io";
import { getRoom } from "../../rooms";
import { getUsers, moveUser } from "../../users";

const completeUser = (socket: Socket, io: Server) => {
  socket.on('completeUser', ({ userID, isConfirm }, callback) => {
    const {user, userSocket} = moveUser(userID);
    if(isConfirm) {
      const {roomObj} = getRoom(user.getRoom());
      roomObj.getMembers().push(user);
      userSocket.join(user.getRoom());
      io.in(user.getRoom()).emit('users', getUsers(user.getRoom()));
      userSocket.emit('isConfirm', JSON.stringify({
        roomObj,
        memberVote: roomObj.getMemberVote(),
        userID: user.getId(),
        status: 200,
      }));
    } else {
      userSocket.emit('isConfirm', JSON.stringify({
        status: 403,
      }));
    }
    callback(JSON.stringify({
      status: 200,
    }));
  })
}

export default completeUser;