const mongoose = require('mongoose');
import passport from 'passport';
const auth = require('../auth');
const Users = mongoose.model('Users');
const customSession = require('../_core/custom-session');

import express from 'express';
const router = express.Router();

router.post("/local/register", auth.optional, function(req, res) {
  const { body: { email, password } } = req;

  if(!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users({ email });

  finalUser.setPassword(password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/local/login', auth.optional, (req, res, next) => {
  const { body: { email, password } } = req;

  if(!email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    console.log("alo")
    console.log("arguments err",err)
    console.log("arguments passportUser",passportUser)
    console.log("arguments info",info)
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      const authUser = user.toAuthJSON();
      customSession.addToSession(authUser.user, authUser.token);

      return res.json(authUser);
    }

    return res.status(400);
  })(req, res, next); //todo ??
});

//GET current route (required, only authenticated users have access)
router.get('local/current', auth.required, (req, res, next) => {
  const { body: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;