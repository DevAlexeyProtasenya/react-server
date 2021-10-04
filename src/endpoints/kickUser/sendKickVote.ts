import { Server, Socket } from 'socket.io';
import { getRoom } from '../../rooms';
import { createKickVoting, getKickVoting } from '../../kickVoting';
import { deleteUser, getUser } from '../../users';
import { KickVote } from '../../entyties/KickVoting';

const sendKickVote = (socket: Socket, io: Server) => {
  socket.on('sendKickVote', ({ userID, voteID, vote }, callback) => {
    const { kickVoting } = getKickVoting(voteID);
    const { user } = getUser(userID);
    const { roomObj } = getRoom(user.getRoom());
    const { isMasterAsPlayer } = roomObj.getGameSettings();
    const membersAmount = isMasterAsPlayer
      ? roomObj.getPlayers().length - 1
      : roomObj.getPlayers().length;
    kickVoting.getVotes().push({ vote, member: user } as KickVote);
    if (kickVoting.getVotes().length === membersAmount) {
      const kickResult = kickVoting.getVoteResult() > 0 ? true : false;
      if(kickResult) { 
        deleteUser(userID);
      }
      io.in(user.getRoom()).emit('kickResult', { kickResult, victim: kickVoting.getVictim() });
    }
  });
};

export default sendKickVote;
