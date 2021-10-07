import { Server, Socket } from "socket.io";
import { deleteRoom } from "../../rooms";
import { deleteUser, getUsers } from "../../users";

const removeRoom = (socket: Socket, io: Server) => {
  socket.on("deleteRoom", ({roomID}, callback) => {
    io.in(roomID).emit('cancelGame');
    const users = getUsers(roomID);
    users.forEach(user => {
      deleteUser(user.getId());
    });
    const room = deleteRoom(roomID);
    if (room) {
      return callback(JSON.stringify({
        status: 200,
      }));
    }
    return callback(JSON.stringify({
      status: 404,
      message: "Room not found!",
    }));
  });
}

export default removeRoom;
