'use strict';

const _ = require('lodash');
const passportJwt = require('passport-jwt');

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'vkrbt',
}

const strategy = new JwtStrategy(opts, (jwt_payload, next) => {
  const user = users[_.findIndex(users, { id: jwt_payload.id })];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
})
strategy.options = opts;
module.exports = strategy;
