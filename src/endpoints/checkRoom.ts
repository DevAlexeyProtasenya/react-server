import { Server, Socket } from "socket.io";
import { getRoom } from "../rooms";

const checkRoom = (socket: Socket, io: Server) => {
  socket.on('checkRoom', ({ roomID }, callback) => {
    const { roomObj, errorRoom } = getRoom(roomID);
    if (errorRoom) {
      return callback(JSON.stringify({
        status: 404,
        typeError: "Data not found",
        message: errorRoom,
      }));
    }
    return callback(JSON.stringify({
      roomObj,
      status: 200,
    }));
  })
};

export default checkRoom;