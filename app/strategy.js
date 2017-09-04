const passportJwt = require('passport-jwt');
const UserModel = require('./models/user.model');

const JwtStrategy = passportJwt.Strategy;

const options = require('./config');

const strategy = new JwtStrategy(options, async (payload, next) => {
  const user = await UserModel.findById(payload.id);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

module.exports = strategy;
