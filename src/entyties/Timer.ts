import { Server } from "socket.io";
import { GameSettings, Room } from "./Room";

export class Timer {
  private min: number;
  private sec: number;
  private start: boolean;

  constructor($minutes: number, $seconds: number) {
    this.min = $minutes;
    this.sec = $seconds;
    this.start = false;
  }

  public getMinutes(): number {
    return this.min;
  }

  public setMinutes(minute: number): void {
    this.min = minute;
  }

  public getSeconds(): number {
    return this.sec;
  }

  public setSeconds(seconds: number): void {
    this.sec = seconds;
  }

  public startTimer(io: Server, roomObj: Room): void {
    const MAX_SECONDS = 59;
    const {timeMin, timeSec} = roomObj.getGameSettings();
    this.start = true;
    const interval = setInterval(() => {
      if ((this.min === 0 && this.sec === 0) || !this.start) {
        clearInterval(interval);
        this.min = parseInt(timeMin, 10);
        this.sec = parseInt(timeSec, 10);
        roomObj.makeStat();
        io.in(roomObj.getRoomID()).emit('getVoteResults', roomObj);
      } else if (this.sec === 0) {
        this.setSeconds(MAX_SECONDS);
        this.setMinutes(this.min - 1);
      } else {
        this.setSeconds(this.sec - 1);
      }
    }, 1000)
  }

  public stopTimer(): void {
    this.start = false;
  }

  public getTime(): string {
    return `${this.min}:${this.sec}`;
  }
}