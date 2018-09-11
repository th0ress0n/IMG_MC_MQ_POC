'use strict';

const express = require('express');
const RabbitMQ = require('rabbitmq-node');

var routing = require('../common/routing');
var queues = require('../common/queues');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Pillar Three Started......\n'+routing.EVT_HEARTBEAT);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

var rabbitmq = new RabbitMQ('amqp://0.0.0.0');

rabbitmq.on('message', function(channel, message) {
  console.log(message);
  rabbitmq.publish(queues.XPKIT_ANALYTICS, {message: 'P3 received '+message+' on channel '+channel});
});

rabbitmq.on('error', function(err) {
  console.error(err);
});

rabbitmq.on('logs', function(print_log) {
  console.info(print_log);
});

rabbitmq.subscribe(queues.SCREEN_CORE);