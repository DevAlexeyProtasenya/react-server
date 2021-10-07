import { Socket } from "socket.io";
import { getUsers } from "../../users";

const getUsersEP = (socket: Socket) => {
  socket.on('getUsers', ({ roomID }, callback) => {
    const users = getUsers(roomID);
    if(users) {
      return callback(JSON.stringify({
        users,
        status: 200,
      }));
    }
    return callback(JSON.stringify({
      message: 'Room not found!',
      status: 404,
    }));
  })
}

export default getUsersEP;