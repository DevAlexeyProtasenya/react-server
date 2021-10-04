import { User } from './User';

export class KickVoting {
  private id: string;

  private maniac: User;

  private victim: User;

  private votes: KickVote[];

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getManiac(): User {
    return this.maniac;
  }

  public setManiac(maniac: User): void {
    this.maniac = maniac;
  }

  public getVictim(): User {
    return this.victim;
  }

  public setVictim(victim: User): void {
    this.victim = victim;
  }

  public getVotes(): KickVote[] {
    return this.votes;
  }

  public setVotes(votes: KickVote[]): void {
    this.votes = votes;
  }

  constructor($id: string, $maniac: User, $victim: User) {
    this.id = $id;
    this.maniac = $maniac;
    this.victim = $victim;
  }

  public getVoteResult() {
    let result = 0;
    this.votes.forEach(elem => elem.vote ? result += 1 : result -= 1);
    return result;
  }
}

export interface KickVote {
  member: User;
  vote: boolean;
}
