import { v4 as uuidv4 } from 'uuid';
import { GameState, Room } from './entyties/Room';

const rooms: Room[] = []

export const addRoom = () => {
  let id: string;
  do {
    id = uuidv4();
  } while (rooms.find(elem => elem.getRoomID() === id))
  const initState = GameState.WAITING;
  const roomObj = new Room (id, initState)
  rooms.push(roomObj);
  return { roomObj };
}

export const getRoom = (id: string) => {
  const roomObj = rooms.find(room => room.getRoomID() === id)
  if (!roomObj) return { errorRoom: "Room is not found!" }
  return { roomObj }
}

export const deleteRoom = (id: string) => {
  const index = rooms.findIndex((room) => room.getRoomID() === id);
  if (index !== -1) return rooms.splice(index, 1)[0];
}