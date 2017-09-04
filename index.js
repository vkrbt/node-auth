'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const routes = require('./app/router');
const strategy = require('./app/strategy');

passport.use(strategy);

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);


const port = 3101;
const server = app.listen(port, () => {
  console.log(`Server runing. http://localhost:${port}`);
});

const io = require('socket.io')(server, {
  serveClient: true,
});

require('./app/sockets')(io);

module.exports = app;
