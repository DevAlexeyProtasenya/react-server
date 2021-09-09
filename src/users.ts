import { Role, User } from "./entyties/User"

const users: User[] = []

export const addUser = (
  id: string,
  name: string,
  role: Role,
  room: string,
  surname?: string,
  image?: string,
  jobPosition?: string,
) => {
  const user = new User (id, name, role, room, surname, jobPosition, image );
  users.push(user);
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

export const getUsers = (room: string) => users.filter(user => user.getRoom() === room)