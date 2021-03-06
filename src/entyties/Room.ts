import { Issue } from "./Issue";
import { MemberVote, MemberVoteStatus } from "./MemberVote";
import { Timer } from "./Timer";
import { Role, User } from "./User";

export class Room {
  private roomID: string;
  private state: string;
  private name: string;
  private issues: Issue[];
  private gameSettings: GameSettings;
  private members: User[];
  private timer: Timer;
  private memberVote: MemberVote;

  public getMemberVote(): MemberVote {
    return this.memberVote;
  }

  public setMemberVote(memberVote: MemberVote): void {
    this.memberVote = memberVote;
  }

  public getTimer(): Timer {
    return this.timer;
  }

  public setTimer(timer: Timer): void {
    this.timer = timer;
  }

  public getMembers(): User[] {
    return this.members;
  }

  public setMembers(members: User[]): void {
    this.members = members;
  }

  public getRoomID(): string {
    return this.roomID;
  }

  public setRoomID(roomID: string): void {
    this.roomID = roomID;
  }

  public getState(): string {
    return this.state;
  }

  public setState(state: string): void {
    this.state = state;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getIssues(): Issue[] {
    return this.issues;
  }

  public setIssues(issues: Issue[]): void {
    this.issues = issues;
  }

  public getGameSettings?(): GameSettings {
    return this.gameSettings;
  }

  public setGameSettings(gameSettings: GameSettings): void {
    this.gameSettings = gameSettings;
  }

  public setRoomData(room: {
    roomID: string;
    name: string;
    state: GameState;
    issues: Issue[];
    gameSettings: GameSettings;
    members: {
      id: string;
      name: string;
      surname?: string;
      jobPosition?: string;
      image?: string;
      room: string;
      role: Role;
    }[];
  }): void {
    this.roomID = room.roomID;
    this.state = room.state;
    this.name = room.name;
    this.issues = room.issues;
    this.gameSettings = room.gameSettings;
    this.members = room.members.map(member => new User(
      member.id,
      member.name,
      member.role,
      member.room,
      member.surname,
      member.jobPosition,
      member.image
    ));
  }

  public getPlayers(): User[] {
    const {isMasterAsPlayer} = this.getGameSettings();
    const members = this.getMembers();
    console.log(members);
    const players = members.filter((member) => member.getRole1() === Role.player);
    if(isMasterAsPlayer){
      players.push(this.getDealer());
    }
    return players;
  }

  public removeUserFromRoom(userId: string): void {
    const index = this.members.findIndex(user => userId === user.getId());
    if(index !== -1) {
      this.members.splice(index, 1);
    }
  } 

  public getDealer(): User {
    return this.getMembers().find(member => member.getRole1() === Role.dealer);
  }

  public makeStat(): void {
    const statistic: { value: string; amount: number }[] = [];
    this.memberVote.memberVoteResult.forEach(memberVote => {
      const card = statistic.find(value => value.value === memberVote.value);
      if(card){
        card.amount += 1;
      } else {
        statistic.push({amount: 1, value: memberVote.value});
      }
    });
    let voteAmount = 0;
    this.memberVote.status = MemberVoteStatus.FINISHED;
    statistic.forEach(card => voteAmount += card.amount);
    this.issues[this.memberVote.currentIssue].statistic = statistic.map(elem => {
      return {
        value: elem.value,
        percentage: (elem.amount/voteAmount*100).toString()
      }
    })
  }

  constructor($roomID: string, $state: string, $name: string, $issues: Issue[], $gameSettings: GameSettings) {
    this.roomID = $roomID;
    this.state = $state;
    this.name = $name;
    this.issues = $issues;
    this.gameSettings = $gameSettings;
  }
}

export enum GameState {
  WAITING = 'WAITING',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT',
}

export type GameSettings = {
  isMasterAsPlayer: boolean;
  cardValues: string[];
  scopeTipeShort: string;
  cardCover: string;
  isAutoNewPlayer: boolean;
  isAutoCardFlipping: boolean;
  isChangingCard: boolean;
  isTimer: boolean;
  timeMin: string;
  timeSec: string;
};

export const fibonacci = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];

export const initialSettings: GameSettings = {
  isMasterAsPlayer: true,
  cardValues: fibonacci,
  scopeTipeShort: '',
  cardCover: '5',
  isAutoNewPlayer: true,
  isAutoCardFlipping: true,
  isChangingCard: false,
  isTimer: false,
  timeMin: '2',
  timeSec: '00',
};
