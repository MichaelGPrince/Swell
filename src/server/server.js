const path = require('path');
const express = require('express');
const ngrok = require('ngrok');

const app = express();
const port = 3000;

const websocket = require('./websocket.js');

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// const WebSocket = require('ws');
// const http = require('http');

// const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//     methods: 'GET, POST, PUT, DELETE, OPTIONS',
//   }
// });
// const io = require("socket.io")(3000, {
//   cors: {
//     origin: ["http://localhost:8080"],
//   },
// })
// io.on("connection", (socket) => {
//   console.log("connected")
//   socket.on("message", (data) => {
//     console.log(data)
//     // io.emit("message", data)
//   })
// })


// io.on('connection', socket => {
//   console.log('HOUSTON WE HAVE CONNECT');
  
//   socket.on('disconnect', reason => {
//     console.log('bye we r disconnected');
//   });

//   socket.on('message', data => {
//     console.log(data);
//     socket.emit('poo poo', data);
//   });
// });

// // const server = http.createServer(app);
// // const wss = new WebSocket.Server({ server }, console.log('ws server created'));

// // wss.on('connection', (ws) => {
// //   console.log('ws connection');
// //   ws.on('message', (message) => {
// //     console.log('received: %s', message);
// //   });
// //   ws.send('something');
// // });
// // wss.on('connection', (ws: WebSocket) => {
// //   console.log('establish websocket connection');
// //   ws.on('message', (message) => {
// //     console.log('received: %s', message);
// //   });
// // });

// // io.on('connection', socket => {
// //   console.log('websocket io connected');
// // });

app.get('/', (req, res) => res.send('Hello World!'));

// app.use(express.static(path.resolve(__dirname, '../../build')));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// // server.on('connection', (socket) => {
// //   socket.on('message', (message) => {
// //     socket.send(`we are sending a message to the client! ${message}`);
// //   });
// // });


app.post('/webhookServer', (req, res) => {
  console.log('Server Is On!');
  ngrok
    .connect({
      proto: 'http',
      addr: '3000',
    })
    .then((url) => {
      console.log(`ngrok tunnel opened at: ${url}/webhook`);
      return res.status(200).json(url);
    });
  // turning on webhook connection
  // ws.send('test websocket in server on middleware');
  // return res.status(200).json('Hi! I am a test!');
});

app.delete('/webhookServer', (req, res) => {
  console.log('Server Is Off!');
  ngrok.kill();
  return res.status(200).json('the server has been deleted');
});

// // // listening for stuff
app.post('/webhook', websocket.open, (req, res)=> {
  console.log(req.body);
  return res.status(200).json('WE DID IT!?');
})

// app.get('*', (req, res) => {
//   console.log('helooooo');
//   // res.status(200).sendFile(path.join(__dirname, '../index.js'));
//   // res.status(200).sendFile(path.join(__dirname,'../../index-csp.html'))
// });

// // //inital error handler, needs work
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

// //Global Handler, needs work
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errObj = {...defaultErr, ...err}
  // const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app.listen(port, () => console.log(`Listening on port ${port}`));

