const mongoose = require('mongoose');
const passport = require('passport');
const UserModel = require('./models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const options = require('./config');
const express = require('express');

const router = express.Router();

mongoose.connect('mongodb://admin:admin@ds119524.mlab.com:19524/node-auth', {
  useMongoClient: true,
});
mongoose.Promise = Promise;

router.get('/', (req, res) => {
  res.json({
    message: 'hello',
  });
});

router.post('/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ name: req.body.name })
      .lean()
      .exec();
    if (user && req.body.password && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({
        id: user._id,
      }, options.secretOrKey);

      res.json({
        message: 'ok',
        token,
      });
    } else {
      res.status(400).json({
        message: 'no such user or password incorrect',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/logout', async (req, res) => {
  console.log(req.app.get('io'));
  res.json({});
});

router.post('/register', async (req, res) => {
  try {
    let user = await UserModel.findOne({ name: req.body.name })
      .lean()
      .exec();
    if (!user && req.body.name && req.body.password) {
      user = await UserModel.create({
        name: req.body.name,
        password: req.body.password,
      });
      res.json(user);
    } else {
      res.status(400).json({ message: 'bad request' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/user', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  res.json({ name: res.req.user.name, id: res.req.user._id });
});

const MessageSchema = require('./models/message.model');
const processMessage = require('./common/processMessage');

router.get('/history/:begin/:limit', passport.authenticate('jwt', {
  session: false,
}), async (req, res) => {
  const begin = +req.params.begin;
  const limit = +req.params.limit;

  if (begin < 0 || limit < 1) {
    res.status(400).json({ message: 'passed arguments less or qual to 0' });
  }

  try {
    const messagesCount = await MessageSchema.count();
    const messages = await MessageSchema
      .find({})
      .sort({ time: -1 })
      .populate({ path: 'user', select: 'name' })
      .skip(begin)
      .limit(limit)
      .lean()
      .exec();
    console.log(messages);
    res.json({
      page: Math.ceil(begin / limit),
      pages: Math.ceil(messagesCount / limit),
      messages: messages.map(message => processMessage(message)),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
