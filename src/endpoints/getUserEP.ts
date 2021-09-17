import { Socket } from "socket.io";
import { getUser } from "../users";

const getUserEP = (socket: Socket) => {
  socket.on('getUser', ({ userID }, callback) => {
    const { user } = getUser(userID);
    if(user) {
      return callback(JSON.stringify({
        user,
        status: 200,
      }));
    }
    return callback(JSON.stringify({
      message: 'User not found!',
      status: 404,
    }));
  })
}

export default getUserEP;