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

module.exports = (io) => {
  io.use(authenticate);

  io.on('connection', (socket) => {
    socket.on('message', async (msg) => {
      const messageObject = {
        text: msg.trim(),
        userId: socket.handshake.user.id,
      };

      const message = await MessageSchema.create(messageObject);
      console.log(message);
    });

    socket.on('history', async () => {
      const messages = await MessageSchema
        .find({})
        .sort({ date: -1 })
        .limit(50)
        .sort({ date: 1 })
        .lean();
      socket.emit('history', messages);
    });
  });
};
