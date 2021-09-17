import { Socket } from "socket.io";
import { getRoom } from "../rooms";

const getRoomEP = (socket: Socket) => {
  socket.on('getRoom', ({ roomID }, callback) => {
    const { roomObj } = getRoom(roomID);
    if(roomObj) {
      return callback(JSON.stringify({
        roomObj,
        status: 200,
      }));
    }
    return callback(JSON.stringify({
      message: 'Room not found!',
      status: 404,
    }));
  })
}

export default getRoomEP;