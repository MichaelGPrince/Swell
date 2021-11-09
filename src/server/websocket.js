// const io = require('socket.io')(3001, {
//   cors: {
//     origin: ['http://localhost:8080'],
//   },
// });
// io.on('connection', (socket) => {
//   console.log('connected');
//   socket.on('message', (data) => {
//     console.log(data);
//     io.emit("message", data)
//   });
// });

const websocket = {};

// const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//   },
// });

websocket.open = (req, res) => {
  console.log('we made it into websocket');
  // const ws = new WebSocket(req, res);
  // ws.on('message', (message) => {
  //   console.log('connected');
  // });
  // ws.on('close', () => {
  //   console.log('disconnected');
  // });
  const io = require('socket.io')(3001, {
    cors: {
      origin: ['http://localhost:8080'],
    },
  });
  io.on('connection', (socket) => {
    console.log('connected');
    socket.on('message', (data) => {
      console.log(data);
      io.emit("message", data)
    });
  });
  return next();
};

module.exports = websocket;
