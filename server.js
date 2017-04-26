const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
const dbPort = config.db.port;
const dbName = config.db.name;
const dbHost = config.db.host;  
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);

// App Setup
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

router(app);

// Server Setup
const port = config.port;
const server = http.createServer(app);
server.listen(port);
console.log('Listening on port:', port);


