"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.deleteUser = exports.getUser = exports.addUser = void 0;
const User_1 = require("./entyties/User");
const users = [];
const addUser = (id, name, surname, room, jobPosition, role) => {
    const existingUser = users.find(currentUser => currentUser.getName().trim().toLowerCase() === name.trim().toLowerCase());
    if (existingUser)
        return { errorUser: "Username has already been taken" };
    if (!name && !room)
        return { errorUser: "Username and room are required" };
    if (!name)
        return { errorUser: "Username is required" };
    if (!room)
        return { errorUser: "Room is required" };
    const user = new User_1.User(id, name, surname, jobPosition, role, room);
    users.push(user);
    return { user };
};
exports.addUser = addUser;
const getUser = (id) => {
    const user = users.find(currentUser => currentUser.getId() === id);
    return { user };
};
exports.getUser = getUser;
const deleteUser = (id) => {
    const index = users.findIndex((user) => user.getId() === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};
exports.deleteUser = deleteUser;
const getUsers = (room) => users.filter(user => user.getRoom() === room);
exports.getUsers = getUsers;
//# sourceMappingURL=users.js.map