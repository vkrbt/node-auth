const passportJwt = require('passport-jwt');
const UserModel = require('./models/user.model');

const JwtStrategy = passportJwt.Strategy;

const options = require('./config');

const strategy = new JwtStrategy(options, async (payload, next) => {
  let user;
  try {
    user = await UserModel.findById(payload.id);
  } catch (err) {
    console.error(err);
  }
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

module.exports = strategy;
