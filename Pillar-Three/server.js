'use strict';

const express = require('express');
const RabbitMQ = require('rabbitmq-node');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Pillar Three Started......\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
