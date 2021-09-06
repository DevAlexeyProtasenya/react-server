export class User {
  private id: string;
  private name: string;
  private surname: string;
  private room: string;
  private jobPosition: string;
  private role: Role;

  constructor($id: string, $name: string, $surname: string, $jobPosition: string, $role: Role, $room: string) {
    this.id = $id;
    this.name = $name;
    this.surname = $surname;
    this.role = $role;
    this.room = $room;
    this.jobPosition = $jobPosition;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
      this.id = id;
  }

  public getName(): string {
      return this.name;
  }

  public setName(name: string): void {
      this.name = name;
  }

  public getSurname(): string {
      return this.surname;
  }

  public setSurname(surname: string): void {
      this.surname = surname;
  }

  public getRoom(): string {
    return this.room;
  }

  public setRoom(room: string): void {
    this.room = room;
  }

  public getJobPosition(): string {
      return this.jobPosition;
  }

  public setJobPosition(jobPosition: string): void {
      this.jobPosition = jobPosition;
  }

  public getRole(): Role {
      return this.role;
  }

  public setRole(role: Role): void {
      this.role = role;
  }
}

export enum Role {
  diler = 'diler',
  observer = 'observer',
  player = 'player',
}

