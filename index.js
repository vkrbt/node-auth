'use strict';

const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const strategy = require('./app/strategy');
const options = strategy.options;

const app = express();

passport.use(strategy);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

require('./app/router')(app);

const port = 3101;
app.listen(port, () => {
  console.log(`Server runing. http://localhost:${port}`);
})