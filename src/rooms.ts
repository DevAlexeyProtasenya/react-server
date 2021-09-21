import { v4 as uuidv4 } from 'uuid';
import { Issue } from './entyties/Issue';
import { GameSettings, GameState, initialSettings, Room } from './entyties/Room';
import { Role } from './entyties/User';

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
  members: {
    id: string;
    name: string;
    surname?: string;
    jobPosition?: string;
    image?: string;
    room: string;
    role: Role;
  }[];
}) => {
  const {roomObj} = getRoom(room.roomID);
  if(roomObj){
    roomObj.setRoomData(room);
    return {roomObj}
  }
  return { errorRoom: "Room is not found!" };
}

export const deleteRoom = (id: string) => {
  const index = rooms.findIndex((room) => room.getRoomID() === id);
  if (index !== -1) return rooms.splice(index, 1)[0];
}