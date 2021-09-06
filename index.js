const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const PORT = process.env.PORT || 5000
const { addUser, getUser, deleteUser, getUsers } = require('./users')
const { addRoom, getRoom, deleteRoom } = require('./rooms')

app.use(cors())

io.on('connection', (socket) => {
  socket.on('login', ({ name, room }, callback) => {
    console.log(`Connecting user ${name} to room ${room} `)
    const { user, errorUser } = addUser(socket.id, name, room);
    if (errorUser) {
      console.log('User exist')
      return callback(JSON.stringify({
        status: 409,
        typeError: "Data is already exist",
        message: errorUser,
      }));
  }
    const { roomObj, errorRoom } = getRoom(room);
    if (errorRoom) {
      deleteUser(user.id);
      console.log('Room does not exist')
      return callback(JSON.stringify({
        status: 404,
        typeError: "Data not found",
        message: errorRoom,
      }));
    }
    console.log(user);
    socket.join(user.room);
    socket.in(user.room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room` });
    io.in(user.room).emit('users', getUsers(user.room));
    console.log('User was connected')
    callback(JSON.stringify({
      status: 200,
      roomObj,
    }));
  })

  socket.on('createRoom', ({ name }, callback) => {
    const { roomObj } = addRoom();
    const { user, errorUser } = addUser(socket.id, name, roomObj.id)
    if (errorUser) {
      deleteRoom(roomObj.id);
      return callback(JSON.stringify({
        status: 409,
        typeError: "Data is already exist",
        message: errorUser,
      }))
    }
    socket.join(user.room)
    socket.in(user.room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room` })
    io.in(user.room).emit('users', getUsers(user.room))
    callback(JSON.stringify({
      status: 200,
      roomObj,
    }))
  })

  socket.on('sendMessage', message => {
    const user = getUser(socket.id)
    io.in(user.room).emit('message', { user: user.name, text: message });
  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id)
    if (user) {
      io.in(user.room).emit('notification', { title: 'Someone just left', description: `${user.name} just left the room` })
      io.in(user.room).emit('users', getUsers(user.room))
    }
  })
})

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

http.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
})