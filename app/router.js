const mongoose = require('mongoose');
const passport = require('passport');
const UserModel = require('./models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const options = require('./strategy').options;

mongoose.connect('mongodb://admin:admin@ds119524.mlab.com:19524/node-auth', {
  useMongoClient: true,
});
mongoose.Promise = Promise;

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({
      message: 'hello',
    });
  });

  app.post('/login', async (req, res) => {
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
        res.status(401).json({
          message: 'no such user or password incorrect',
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

  app.post('/register', async (req, res) => {
    console.log(req.body)
    try {
      let user = await UserModel.findOne({ name: req.body.name })
        .lean()
        .exec();
      if (!user && req.body.name && req.body.password) {
        user = await UserModel.create({
          name: req.body.name,
          password: req.body.password,
        });
      } else {
        res.status(400).json({ message: 'bad request' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

  app.get('/secret', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    res.json('Yeah');
  });
};
