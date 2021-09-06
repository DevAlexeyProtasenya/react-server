const { v4: uuidv4 } = require('uuid');

const rooms = []

const addRoom = () => {
  let id;
  do {
    id = uuidv4();
  } while (!rooms.find(elem => elem.id === id))
  const state = 'Waiting for players';

  const room = { id, state }
  rooms.push(room);
  return room;
}

const getRoom = id => {
    let room = rooms.find(user => user.id == id)
    if (!room) return { error: "Room is not find!" }
    return room
}

const deleteRoom = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

module.exports = { addRoom, getRoom, deleteRoom }