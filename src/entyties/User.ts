export class User {
  private id: string;
  private name: string;
  private surname?: string;
  private jobPosition?: string;
  private image?: string;
  private room: string;
  private role: Role;

  constructor($id: string, $name: string, $role: Role, $room: string, $surname?: string, $jobPosition?: string, $image?: string) {
    this.id = $id;
    this.name = $name;
    this.surname = $surname;
    this.role = $role;
    this.room = $room;
    this.jobPosition = $jobPosition;
    this.image = $image;
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

  public getImage(): string {
    return this.image;
  }

  public setImage(image: string): void {
    this.image = image;
  }
}

export enum Role {
  dealer = 'dealer',
  observer = 'observer',
  player = 'player',
}

