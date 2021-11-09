import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';

// import { socket } from 'socketUtil.js';
// const io = require('socket.io-client');
// const socket = io('http://localhost:3000');

// import { w3cwebsocket as W3CWebSocket } from 'websocket';
// const socket = new W3CWebSocket('ws://127.0.0.1:8080');
// const socket = new W3CWebSocket('http://localhost:3000');

import io from 'socket.io-client';
// let socket = io(`ws://localhost:3000`);
const socket = io(`http://localhost:3001`);

// import { Socket } from 'net';
// import historyController from '../../controllers/historyController';

// const socket = new WebSocket('ws//localhost:3000');

// class WebhoContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

const WebhookContainer = (props) => {
  const [displaySocketData, updateSocketData] = useState('');
  socket.on('connect', () => {
    console.log('you connected!!!');
    socket.send('hulo');
  });

  useEffect(() => {
    console.log('pls');
    socket.on('connect', () => {
      console.log('you connected!!!');
      // socket.send('hulo');
    });
    // socket.on('message', (payload) => {
    //   console.log(payload);
    //   updateSocketData(payload);
    // });
  });

  useEffect(() => {
    console.log('hii new data comin thru', socket);
    // socket.emit('message', { room: 'test-room' });
    socket.on('message', (data) => {
      console.log('data', data);
    });
    // socket.onmessage = () => {
    //   console.log('We got a message!');
    // };
    // socket.on('connection', () => {
    //   console.log('webhook');
    //   socket.emit('message', { room: 'test-room' });
    // });
  }, [displaySocketData]);

  const fakeMessage = () => {
    console.log('trigger fake websocket msg');

    // fetch('/webhook', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     data: {
    //       name: 'test',
    //       message: 'test message',
    //     },
    //   }),
    // });

    socket.emit('message', {
      'u r': 'poop',
    });
  };
  
  let serverOn = false;
  const startServerButton = () => {
    console.log('WE GOT HEREE!!!');
    if (!serverOn) {
      console.log('false');
      serverOn = true;
      fetch('/webhookServer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((data) => data.json())
        .then((url) => console.log(url))
        .catch((err) => console.error(err));
    } else if (serverOn) {
      console.log('true');
      serverOn = false;
      fetch('/webhookServer', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((data) => data.json())
        .then((url) => console.log(url))
        .catch((err) => console.error(err));
    }
  };
  return (
    <div>
      <button className="button is-wh" onClick={() => startServerButton()}>
        Start/Close Server
      </button>
      <button className="button is-wh" onClick={() => fakeMessage()}>
        TESTING
      </button>
      {/* <div> { bob } </div> */}
      {/* <script>
          {const socket = WebSocket('ws://localhost:3000');
          socket.addEventListener('open', function(event){
            console.log('Connected to WS Server')
          });
          
          socket.addEventListener('message', function(event){
            console.log('Message from server ', event.data);
          });
          }
      </script> */}
      {/* <button className="button is-wh" onClick={() => stopServerButton()}>
        STOP SERVER
      </button> */}
    </div>
  );
};

export default WebhookContainer;

//button to generate URL
//button to start/stop sever
//figure out how to listen to the webhook
//save serverOn variable in the store
//dispatch that serverOn prop
//create component for url field?
//add request to history
//reset fields after request is sent
