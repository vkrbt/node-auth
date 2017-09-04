module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('connected', 'Yeah');

    socket.on('message', (data) => {
      socket.emit('message', data);
    });
  });
};
