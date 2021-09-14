import { v4 as uuidv4 } from 'uuid';
import { Issue } from './entyties/Issue';
import { GameSettings, GameState, initialSettings, Room } from './entyties/Room';
import { User } from './entyties/User';

const rooms: Room[] = [];

export const addRoom = () => {
  let id: string;
  do {
    id = uuidv4();
  } while (rooms.find(elem => elem.getRoomID() === id));
  const initState = GameState.WAITING;
  const initName = 'Lobby name';
  const roomObj = new Room (id, initState, initName, [], initialSettings);
  rooms.push(roomObj);
  return { roomObj };
}

export const getRoom = (id: string) => {
  const roomObj = rooms.find(room => room.getRoomID() === id)
  if (!roomObj) return { errorRoom: "Room is not found!" }
  return { roomObj }
}

export const changeRoom = (room:{
  roomID: string;
  name: string;
  state: GameState;
  issues: Issue[];
  gameSettings: GameSettings;
  members: User[];
}) => {
  const newRoom = new Room(room.roomID, room.state, room.name, room.issues, room.gameSettings);
  const index = rooms.findIndex((currentRoom) => currentRoom.getRoomID() === newRoom.getRoomID());
  if (index !== -1) {
    rooms[index] = newRoom;
    return { newRoom };
  };
  return { errorRoom: "Room is not found!" };
}

export const deleteRoom = (id: string) => {
  const index = rooms.findIndex((room) => room.getRoomID() === id);
  if (index !== -1) return rooms.splice(index, 1)[0];
}