'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    text: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    time: { type: Date, default: Date.now },
  }, {
    versionKey: false,
    collection: 'MessageCollection',
  });

module.exports = mongoose.model('MessageModel', MessageSchema);
