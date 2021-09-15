export class Timer {
  private minutes: number;
  private seconds: number;

  constructor($minutes: number, $seconds: number) {
    this.minutes = $minutes;
    this.seconds = $seconds;
  }

  public getMinutes(): number {
    return this.minutes;
  }

  public setMinutes(minute: number): void {
    this.minutes = minute;
  }

  public getSeconds(): number {
    return this.seconds;
  }

  public setSeconds(seconds: number): void {
    this.seconds = seconds;
  }

  public startTimer(): void {
    const MAX_SECONDS = 59;
    const interval = setInterval(() => {
      if (this.minutes === 0 && this.seconds === 0) {
        clearInterval(interval);
      } else if (this.seconds === 0) {
        this.setSeconds(MAX_SECONDS);
        this.setMinutes(this.minutes - 1);
      } else {
        this.setSeconds(this.seconds - 1);
      }
    }, 1000);
  }

  public getTime(): string {
    return `${this.minutes}:${this.seconds}`;
  }
}