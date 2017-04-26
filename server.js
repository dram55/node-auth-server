const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = require('./config').port;

// App Setup
const app = express();

// Server Setup
const server = http.createServer(app);
server.listen(port);
console.log('Listening on port:', port);


