import { Server, Socket } from "socket.io";
import { createKickVoting } from "../../kickVoting";
import { getUser } from "../../users";

const startKickVoting = (socket: Socket, io: Server) => {
  socket.on('startKickVoting', ({victimID, maniacID}, callback) => {
    const victim = getUser(victimID).user;
    const maniac = getUser(maniacID).user;
    const kickVoting = createKickVoting(victim, maniac);
    io.in(victim.getRoom()).emit('kickVouting', kickVoting);
    return callback(JSON.stringify({
      status: 200
    }))
  })
}

export default startKickVoting;