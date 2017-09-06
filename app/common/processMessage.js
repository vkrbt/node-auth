const processMessage = message => ({ ...message, time: Date.parse(message.time) });

module.exports = processMessage;
