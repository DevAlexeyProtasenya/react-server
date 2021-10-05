import { Server, Socket } from "socket.io";
import { getRoom } from "../../rooms";
import { deleteUser, getUsers } from "../../users";

const deleteUserFromRoom = (socket: Socket, io: Server) => {
  socket.on("deleteUser", ({userID}, callback) => {
    const user = deleteUser(userID);
    const {roomObj} = getRoom(user.getRoom());
    if (user) {
      roomObj.removeUserFromRoom(userID);
      io.in(user.getRoom()).emit('users', getUsers(user.getRoom()))
      return callback(JSON.stringify({
        status: 200,
      }));
    }
    return callback(JSON.stringify({
      status: 404,
      message: "User not found",
    }));
  });
}

export default deleteUserFromRoom;
