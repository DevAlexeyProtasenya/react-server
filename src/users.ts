import { Role, User } from "./entyties/User"
import { v4 as uuidv4 } from 'uuid';
import { Socket } from "socket.io";

const users: User[] = []
const waitingList: {user: User, socket: Socket}[] = []

export const addUser = (
  name: string,
  role: Role,
  room: string,
  waiting: boolean,
  surname?: string,
  image?: string,
  jobPosition?: string,
  socket?: Socket,
) => {
  let id: string;
  do {
    id = uuidv4();
  } while (users.find(elem => elem.getId() === id));
  const user = new User (id, name, role, room, surname, jobPosition, image);
  waiting ? waitingList.push({user, socket}) : users.push(user);
  return { user };
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


export const getUserFromWaiting = (id: string) => {
  const {user, socket} = waitingList.find(currentUser => currentUser.user.getId() === id)
  return { user, userSocket: socket }
}

export const deleteUserFromWaiting = (id: string) => {
  const index = waitingList.findIndex((user) => user.user.getId() === id);
  if (index !== -1) {
    return waitingList.splice(index, 1)[0];
  }
}

export const moveUser = (id: string) => {
  const {user, userSocket} = getUserFromWaiting(id);
  users.push(user);
  deleteUserFromWaiting(id);
  return {user, userSocket};
}

export const getUsers = (room: string) => users.filter(user => user.getRoom() === room)