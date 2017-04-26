const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = require('./config').port;
const router = require('./router');

// App Setup
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

router(app);

// Server Setup
const server = http.createServer(app);
server.listen(port);
console.log('Listening on port:', port);


