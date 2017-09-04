module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('connected', 'Yeah');

    socket.on('authenticate', (data) => {
      console.log(data);
    });
  });
};
