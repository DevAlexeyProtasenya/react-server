import { Server, Socket } from "socket.io";
import { deleteUser, getUsers } from "../users";

const disconnect = (socket: Socket, io: Server) => {
  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id);
    if (user) {
      io.in(user.getRoom()).emit('notification', { title: 'Someone just left', description: `${user.getName()} just left the room` })
      io.in(user.getRoom()).emit('users', getUsers(user.getRoom()))
    }
  })
}

export default disconnect;
