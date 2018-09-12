'use strict';

var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const RabbitMQ = require('rabbitmq-node');

var routing = require('./common/routing');
var queues = require('./common/queues');

const HOST = '0.0.0.0';
var PORT = process.env.PORT || 8080;
server.listen(PORT);

app.use("/css", express.static(__dirname + '/css'));
app.use("/lib", express.static(__dirname + '/lib'));
app.use("/img", express.static(__dirname + '/img'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('init', { message: 'client init' });
  
  socket.on('init_callback', function (data) {
    console.log(data);
  });

});

var rabbitmq = new RabbitMQ('amqp://'+HOST);

rabbitmq.on('message', function(channel, message) {
  console.log("P3 "+message.toString());
  io.sockets.volatile.emit('add_message', { message: message.toString() } );
  rabbitmq.publish(queues.XPKIT_ANALYTICS, {message: 'P3 received '+message+' on channel '+channel});
});

rabbitmq.on('error', function(err) {
  console.error(err);
});

rabbitmq.on('logs', function(print_log) {
  console.info(print_log);
});

rabbitmq.subscribe(queues.SCREEN_CORE);

