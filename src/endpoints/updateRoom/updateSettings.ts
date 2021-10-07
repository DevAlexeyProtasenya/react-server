import { Server, Socket } from "socket.io";
import { getRoom } from "../../rooms";

const updateSettings = (socket: Socket, io: Server) => {
  socket.on('updateSettings', ({ roomID, gameSettings }, callback) => {
    const {roomObj, errorRoom} = getRoom(roomID);
    if (errorRoom) {
      return callback(JSON.stringify({
        status: 404,
        message: 'Room not found!',
      }));
    }
    roomObj.setGameSettings(gameSettings);
    io.in(roomObj.getRoomID()).emit('updatedRoom', roomObj);
    return callback(JSON.stringify({
      status: 200,
    }));
  })
};

export default updateSettings;