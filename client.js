#!/usr/bin/env node
var WebSocketClient = require('websocket').client;


function main () {
  var client = new WebSocketClient();
  client.on('connectFailed', function(error) {
      console.log('Connect Error: ' + error.toString());
      reconn(client)
  });

  client.on('connect', function(connection) {
      console.log('WebSocket Client Connected');
      connection.on('error', function(error) {
          console.log("Connection Error: " + error.toString());
      });
      connection.on('close', function() {
          console.log('echo-protocol Connection Closed');
          reconn(client)
      });
      connection.on('message', function(message) {
          if (message.type === 'utf8') {
              // console.log("Received: '" + message.utf8Data + "'");
          }
      });
      
      function sendNumber() {
          if (connection.connected) {
              const t = new Date()
              console.log('Sent: ', t)
              connection.sendUTF(t.getTime());
              setTimeout(sendNumber, 2000);
          }
      }
      sendNumber();
  });

  client.connect('ws://intrising.io:8888/', 'echo-protocol');
}

function reconn(client) {
  console.log('retry client connection after 3 sec.');
  setTimeout(function () {
    client.connect('ws://intrising.io:8888/', 'echo-protocol');
  }, 3000);
}

main()