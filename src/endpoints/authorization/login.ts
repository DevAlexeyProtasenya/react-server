import { Server, Socket } from "socket.io";
import { getRoom } from "../../rooms";
import { addUser, deleteUser, getUsers } from "../../users";

const login = (socket: Socket, io: Server) => {
  socket.on('login', ({ name, lastName, jobPosition, avatar, role, room }, callback) => {
    console.log(`Connecting user ${name} ${lastName} to room ${room} `);
    const { user } = addUser(name, role, room, lastName, avatar, jobPosition);
    const { roomObj, errorRoom } = getRoom(room);
    if (errorRoom) {
      deleteUser(user.getId());
      return callback(JSON.stringify({
        status: 404,
        message: errorRoom,
      }));
    }
    roomObj.getMembers().push(user);
    socket.join(user.getRoom());
    io.in(user.getRoom()).emit('users', getUsers(user.getRoom()));
    console.log(user);
    callback(JSON.stringify({
      roomObj,
      memberVote: roomObj.getMemberVote(),
      userID: user.getId(),
      status: 200,
    }));
  })
}

export default login;