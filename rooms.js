const { v4: uuidv4 } = require('uuid');

const rooms = []

const addRoom = () => {
  let id;
  do {
    id = uuidv4();
  } while (rooms.find(elem => elem.id === id))
  console.log('before ' + rooms);
  const state = 'Waiting for players';

  const roomObj = { id, state }
  rooms.push(roomObj);
  console.log('after ' + rooms);
  return { roomObj };
}

const getRoom = id => {
    let roomObj = rooms.find(room => room.id === id)
    console.log(roomObj)
    if (!roomObj) return { errorRoom: "Room is not found!" }
    return { roomObj }
}

const deleteRoom = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0];
}

module.exports = { addRoom, getRoom, deleteRoom }