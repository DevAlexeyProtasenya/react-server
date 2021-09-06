import { Role, User } from "./entyties/User"

const users: User[] = []

export const addUser = (
  id: string,
  name: string,
  surname: string,
  room: string,
  jobPosition: string,
  role: Role,
) => {
  const existingUser = users.find(currentUser => 
    currentUser.getName().trim().toLowerCase() === name.trim().toLowerCase())

  if (existingUser) return { errorUser: "Username has already been taken" }
  if (!name && !room) return { errorUser: "Username and room are required" }
  if (!name) return { errorUser: "Username is required" }
  if (!room) return { errorUser: "Room is required" }

  const user = new User (id, name, surname, jobPosition, role, room);
  users.push(user)
  return { user }
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