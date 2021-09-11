import { Server, Socket } from "socket.io";
import { addRoom } from "../rooms";
import { addUser, getUsers } from "../users";

const createRoom = (socket: Socket, io: Server) => {
  socket.on('createRoom', ({ name, lastName, jobPosition, avatar, role }, callback) => {
  const { roomObj } = addRoom();
  const { user } = addUser(socket.id, name, role, roomObj.getId(), lastName, avatar, jobPosition);
  if (!user.getId()) {
    return callback(JSON.stringify({
      status: 500,
      typeError: 'Bad request',
      message: 'Check the request!',
    }));
  };
  socket.join(user.getRoom())
  socket.in(user.getRoom()).emit('notification', { title: 'Someone\'s here', description: `${user.getName()} just entered the room` })
  io.in(user.getRoom()).emit('users', getUsers(user.getRoom()));
  console.log(user);
  callback(JSON.stringify({
    roomObj,
    status: 200,
  }));
})};

export default createRoom;