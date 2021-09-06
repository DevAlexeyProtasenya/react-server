"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const rooms_1 = require("./rooms");
const users_1 = require("./users");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
io.on('connection', (socket) => {
    socket.on('login', ({ name, surname, jobPosition, role, room }, callback) => {
        console.log(`Connecting user ${name} ${surname} to room ${room} `);
        const { user, errorUser } = (0, users_1.addUser)(socket.id, name, surname, room, jobPosition, role);
        if (errorUser) {
            return callback(JSON.stringify({
                status: 409,
                typeError: "Data is already exist",
                message: errorUser,
            }));
        }
        const { roomObj, errorRoom } = (0, rooms_1.getRoom)(room);
        if (errorRoom) {
            (0, users_1.deleteUser)(user.getId());
            return callback(JSON.stringify({
                status: 404,
                typeError: "Data not found",
                message: errorRoom,
            }));
        }
        socket.join(user.getRoom());
        socket.in(user.getRoom()).emit('notification', { title: 'Someone\'s here', description: `${user.getName()} just entered the room` });
        io.in(user.getRoom()).emit('users', (0, users_1.getUsers)(user.getRoom()));
        callback(JSON.stringify({
            roomObj,
            status: 200,
        }));
    });
    socket.on('createRoom', ({ name, surname, jobPosition, role, }, callback) => {
        const { roomObj } = (0, rooms_1.addRoom)();
        const { user, errorUser } = (0, users_1.addUser)(socket.id, name, surname, roomObj.getId(), jobPosition, role);
        if (errorUser) {
            (0, rooms_1.deleteRoom)(roomObj.getId());
            return callback(JSON.stringify({
                status: 409,
                typeError: "Data is already exist",
                message: errorUser,
            }));
        }
        socket.join(user.getRoom());
        socket.in(user.getRoom()).emit('notification', { title: 'Someone\'s here', description: `${user.getName()} just entered the room` });
        io.in(user.getRoom()).emit('users', (0, users_1.getUsers)(user.getRoom()));
        callback(JSON.stringify({
            roomObj,
            status: 200,
        }));
    });
    socket.on('sendMessage', message => {
        const { user } = (0, users_1.getUser)(socket.id);
        io.in(user.getRoom()).emit('message', { user: user.getName(), text: message });
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
        const user = (0, users_1.deleteUser)(socket.id);
        if (user) {
            io.in(user.getRoom()).emit('notification', { title: 'Someone just left', description: `${user.getName()} just left the room` });
            io.in(user.getRoom()).emit('users', (0, users_1.getUsers)(user.getRoom()));
        }
    });
});
app.get('/', (req, res) => {
    res.send("Server is up and running");
});
httpServer.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
//# sourceMappingURL=index.js.map