"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.getRoom = exports.addRoom = void 0;
const uuid_1 = require("uuid");
const Room_1 = require("./entyties/Room");
const rooms = [];
const addRoom = () => {
    let id;
    do {
        id = (0, uuid_1.v4)();
    } while (rooms.find(elem => elem.getId() === id));
    const initState = Room_1.GameState.waitingForPlayer;
    const roomObj = new Room_1.Room(id, initState);
    rooms.push(roomObj);
    return { roomObj };
};
exports.addRoom = addRoom;
const getRoom = (id) => {
    const roomObj = rooms.find(room => room.getId() === id);
    if (!roomObj)
        return { errorRoom: "Room is not found!" };
    return { roomObj };
};
exports.getRoom = getRoom;
const deleteRoom = (id) => {
    const index = rooms.findIndex((room) => room.getId() === id);
    if (index !== -1)
        return rooms.splice(index, 1)[0];
};
exports.deleteRoom = deleteRoom;
//# sourceMappingURL=rooms.js.map