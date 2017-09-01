const passportJwt = require('passport-jwt');

const UserModel = require('./models/user.model');

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'vkrbt',
};

const strategy = new JwtStrategy(opts, async (payload, next) => {
  const user = await UserModel.findById(payload.id);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
strategy.options = opts;
module.exports = strategy;
