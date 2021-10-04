import { v4 as uuidv4 } from 'uuid';
import { KickVoting, KickVote } from "./entyties/KickVoting";
import { User } from "./entyties/User";

const kickVotings: KickVoting[] = [];

export const createKickVoting = (victim: User, maniac: User): KickVoting  => {
  let id: string;
  do {
    id = uuidv4();
  } while (kickVotings.find(elem => elem.getId() === id));
  const newVoting = new KickVoting(id, maniac, victim);
  kickVotings.push(newVoting);
  return newVoting;
}

export const getKickVoting = (votingID: string) => {
  const kickVoting = kickVotings.find(elem => elem.getId() === votingID);
  if (!kickVoting) return { errorMessage: "Kick vouting is not found!" }
  return { kickVoting }
}

export const deleteKickVoting = (votingID: string) => {
  const index = kickVotings.findIndex((elem) => elem.getId() === votingID);
  if (index !== -1) return kickVotings.splice(index, 1)[0];
}