import { Server, Socket } from "socket.io";
import { getRoom } from "../rooms";
import { addUser, deleteUser, getUsers } from "../users";

const login = (socket: Socket, io: Server) => {
  socket.on('login', ({ name, lastName, jobPosition, avatar, role, room }, callback) => {
    console.log(`Connecting user ${name} ${lastName} to room ${room} `)
    const { user } = addUser(socket.id, name, role, room, lastName, avatar, jobPosition);
    const { roomObj, errorRoom } = getRoom(room);
    if (errorRoom) {
      deleteUser(user.getId());
      return callback(JSON.stringify({
        status: 404,
        typeError: "Data not found",
        message: errorRoom,
      }));
    }
    socket.join(user.getRoom());
    socket.in(user.getRoom()).emit('notification', { title: 'Someone\'s here', description: `${user.getName()} just entered the room` });
    io.in(user.getRoom()).emit('users', getUsers(user.getRoom()));
    console.log(user);
    callback(JSON.stringify({
      roomObj,
      status: 200,
    }));
  })
}

export default login;