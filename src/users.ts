import { Role, User } from "./entyties/User"
import { v4 as uuidv4 } from 'uuid';

const users: User[] = []
const vaitingList: User[] = []

export const addUser = (
  name: string,
  role: Role,
  room: string,
  waiting: boolean,
  surname?: string,
  image?: string,
  jobPosition?: string,
) => {
  let id: string;
  do {
    id = uuidv4();
  } while (users.find(elem => elem.getId() === id));
  const user = new User (id, name, role, room, surname, jobPosition, image);
  waiting ? vaitingList.push(user) : users.push(user);
  return { user };
}

export const deleteUserFromWaiting = (id: string) => {
  const index = users.findIndex((user) => user.getId() === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

export const getUser = (id: string) => {
  const user = users.find(currentUser => currentUser.getId() === id)
  return { user }
}

export const deleteUser = (id: string) => {
  const index = users.findIndex((user) => user.getId() === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

export const getUsers = (room: string) => users.filter(user => user.getRoom() === room)