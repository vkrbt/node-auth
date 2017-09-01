'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const strategy = require('./app/strategy');
const cors = require('cors');

passport.use(strategy);

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cors());


require('./app/router')(app);

const port = 3101;
app.listen(port, () => {
  console.log(`Server runing. http://localhost:${port}`);
});

module.exports = app;
