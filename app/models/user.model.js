'use strict';

const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String },
    password: { type: String },
    registered: { type: Date, default: Date.now },
  }, {
    versionKey: false,
    collection: 'UserCollection',
  });

UserSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew()) {
    this.password = bcrypt.hashSync(this.password, 12);
    next();
  }
});

module.exports = mongoose.model('UserModel', UserSchema);
