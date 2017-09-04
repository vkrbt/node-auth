const passportJwt = require('passport-jwt');

const ExtractJwt = passportJwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'vkrbt',
};

module.exports = opts;
