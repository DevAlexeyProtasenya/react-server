import { Server, Socket } from "socket.io";
import { getRoom } from "../../rooms";

const updateIssues = (socket: Socket, io: Server) => {
  socket.on('updateIssues', ({ roomID, issues }, callback) => {
    const {roomObj, errorRoom} = getRoom(roomID);
    if (errorRoom) {
      return callback(JSON.stringify({
        status: 404,
        message: 'Room not found!',
      }));
    }
    roomObj.setIssues(issues);
    console.log(roomObj.getIssues());
    io.in(roomObj.getRoomID()).emit('updatedRoom', roomObj);
    return callback(JSON.stringify({
      status: 200,
    }));
  })
};

export default updateIssues;