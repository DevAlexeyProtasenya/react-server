export class Room {
  private id: string;
  private state: string;

  constructor($id: string, $state: string) {
    this.id = $id;
    this.state = $state;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getState(): string {
    return this.state;
  }

  public setState(state: string): void {
    this.state = state;
  }

}

export enum GameState {
  waitingForPlayer = 'Waiting for players',
  playing = 'Playing',
}