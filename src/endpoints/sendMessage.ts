import { Server, Socket } from "socket.io";
import { getUser } from "../users";

const sendMessage = (socket: Socket, io: Server) => {
  socket.on('sendMessage', ({message, userID}) => {
    const { user } = getUser(userID);
    if(user) {
      io.in(user.getRoom()).emit('message', { user, message });
    }
  })
}

export default sendMessage;