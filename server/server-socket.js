let io;

const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const getAllConnectedUsers = () => Object.values(socketToUserMap);
const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.sockets.get(socketid);

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    // FIXME: is this the behavior you want?
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() }); //** */
};

const removeUser = (user, socket) => {
  if (user) delete userToSocketMap[user._id];
  delete socketToUserMap[socket.id];
};

module.exports = {
  // init: (http) => {
  //   io = require("socket.io")(http);

  //   io.on("connection", (socket) => {
  //     console.log(`socket has connected ${socket.id}`);
  //     socket.on("disconnect", (reason) => {
  //       const user = getUserFromSocketID(socket.id);
  //       removeUser(user, socket);
  //     });
  //   });
  init: (http) => {
    io = require("socket.io")(http, {
      cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`);

      // Listen for login and associate user with socket
      socket.on("login", (user) => {
        addUser(user, socket);
        console.log(`User ${user._id} associated with socket ${socket.id}`);
      });

      // Handle disconnection
      socket.on("disconnect", (reason) => {
        console.log(`Socket disconnected: ${socket.id}, reason: ${reason}`);
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });

      // Handle errors
      socket.on("error", (err) => {
        console.error(`Socket error: ${err}`);
      });
    });
  },


  addUser: addUser,
  removeUser: removeUser,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getAllConnectedUsers: getAllConnectedUsers,
  getIo: () => io,
};
