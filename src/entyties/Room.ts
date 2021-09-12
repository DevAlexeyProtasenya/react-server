export class Room {
  private roomID: string;
  private state: string;
  private name?: string;
  private issues?: Issue[];
  private gameSettings?: GameSettings;

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


  constructor($roomID: string, $state: string, $name?: string, $issues?: Issue[], $gameSettings?: GameSettings) {
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
  RESULT = 'RESULT'
}

export interface Issue {
  id: string
  priority: string
  name: string
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