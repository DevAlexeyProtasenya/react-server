import { Server, Socket } from "socket.io";
import { changeRoom } from "../rooms";

const updateRoom = (socket: Socket, io: Server) => {
  socket.on('updateRoom', ({ room }, callback) => {
    const {newRoom, errorRoom} = changeRoom(room);
    if (errorRoom) {
      return callback(JSON.stringify({
        status: 404,
        message: 'Room not found!',
      }));
    }
    io.in(newRoom.getRoomID()).emit('room', newRoom);
    return callback(JSON.stringify({
      status: 200,
    }));
  })
};

export default updateRoom;