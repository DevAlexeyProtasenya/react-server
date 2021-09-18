import { Socket } from "socket.io";
import { getUser, getUsers } from "../users";
import { getRoom } from "../rooms";
import { Role } from "../entyties/User";

const getDataForReload = (socket: Socket) => {
  socket.on('getDataForReload', ({ roomID, userID }, callback) => {
    const { roomObj } = getRoom(roomID);
    if(roomObj) {
      const { user } = getUser(userID);
      const members = getUsers(roomID);
      const dealer = members.find(member => member.getRole() === Role.diler);
      console.log(dealer);
      return callback(JSON.stringify({
        roomObj,
        dealer,
        user,
        users: members,
        status: 200,
      }));
    }
    return callback(JSON.stringify({
      message: 'Room not found!',
      status: 404,
    }));
  })
}

export default getDataForReload;