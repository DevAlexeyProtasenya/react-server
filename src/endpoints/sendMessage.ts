import { Server, Socket } from "socket.io";
import { getUser } from "../users";

const sendMessage = (socket: Socket, io: Server) => {
  socket.on('sendMessage', message => {
    const { user } = getUser(socket.id)
    io.in(user.getRoom()).emit('message', { user: user.getName(), text: message });
  })
}

export default sendMessage;