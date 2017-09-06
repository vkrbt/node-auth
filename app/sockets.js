const jwt = require('jsonwebtoken');
const options = require('./config');
const MessageSchema = require('./models/message.model');

const authenticate = (socket, next) => {
  const token = socket.handshake.query.token;
  const user = jwt.decode(token.slice(4), options.secretOrKey);
  /* es-lint-disable no-param-reassign */
  socket.handshake.user = user;
  /* eslint-enable */
  next();
};

const processMessage = require('./common/processMessage');

module.exports = (io) => {
  io
    .use(authenticate)
    .on('connection', (socket) => {
      socket.on('message', async (msg) => {
        const text = msg.trim();
        if (text) {
          const messageObject = {
            text,
            user: socket.handshake.user.id,
          };
          const message = await MessageSchema.create(messageObject);
          const populatedMessage = await MessageSchema.findOne(message).populate({ path: 'user', select: 'name' });
          socket.broadcast.emit('message', processMessage(populatedMessage._doc));
          socket.emit('message', processMessage(populatedMessage._doc));
        }
      });
    });
};
