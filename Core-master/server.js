'use strict';

const express = require('express');
const RabbitMQ = require('rabbitmq-node');

var routing = require('../common/routing');
var queues = require('../common/queues');

var rabbitmq = new RabbitMQ('amqp://0.0.0.0');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Core Started......\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



rabbitmq.on('message', function(channel, message) {
  console.log(message);
  // if(message==queues.XPKIT_ANALYTICS){
  // 	// log to screen
  // }
});

rabbitmq.on('error', function(err) {
  console.error(err);
});

rabbitmq.on('logs', function(print_log) {
  console.info(print_log);
});

rabbitmq.subscribe(queues.SCREEN_KNOWLEDGE);
rabbitmq.subscribe(queues.SCREEN_COMMUNITY);
rabbitmq.subscribe(queues.SCREEN_LIFE);
rabbitmq.subscribe(queues.SCREEN_FUTURE);
rabbitmq.subscribe(queues.XPKIT_ANALYTICS);
// rabbitmq.publish(queues.SCREEN_CORE, {message: 'Hello World'});
