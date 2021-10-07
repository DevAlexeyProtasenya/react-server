import { Server, Socket } from "socket.io";

const disconnect = (socket: Socket, io: Server) => {
  socket.on("disconnect", () => {
    console.log("User disconnected");
  })
}

export default disconnect;
