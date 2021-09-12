
import { Server, Socket } from "socket.io";
import { deleteUser, getUsers } from "../users";

const deleteUserFromRoom = (socket: Socket, io: Server) => {
  socket.on("deleteUser", ({userID}, callback) => {
    const user = deleteUser(userID);
    if (user) {
      io.in(user.getRoom()).emit('users', getUsers(user.getRoom()))
    } else {
      return callback(JSON.stringify({
        status: 404,
        message: "User not found",
      }));
    }
    return callback(JSON.stringify({
      status: 200,
    }))
  })
}

export default deleteUserFromRoom;
