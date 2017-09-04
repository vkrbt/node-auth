'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    text: { type: String },
    userId: { type: String },
    time: { type: Date, default: Date.now },
  }, {
    versionKey: false,
    collection: 'MessageCollection',
  });

module.exports = mongoose.model('MessageModel', MessageSchema);
