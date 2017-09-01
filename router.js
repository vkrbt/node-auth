'use strict';

const passport = require('passport');

module.exports = app => {

  app.get('/', (req, res) => {
    res.json({
      message: 'hello'
    });
  })

  app.post('/login', (req, res) => {
    const user = users[_.findIndex(users, {
      name: req.body.name
    })];
    if (!user) {
      res.status(400).json({
        message: 'no such user',
      });
    }

    if (req.body.password === user.password) {
      const payload = {
        id: user.id
      };
      const token = jwt.sign(payload, options.secretOrKey);
      res.json({
        message: "ok",
        token: token
      });
    } else {
      res.status(401).json({
        message: "passwords did not match"
      });
    }
  })

  app.get("/secret", passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    res.json("Success! You can see this with a token");
  });
}