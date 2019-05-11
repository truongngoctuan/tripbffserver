import passport from 'passport';
const auth = require('../auth');

import express from 'express';
const router = express.Router();

import { IoC } from '../IoC';
import { IUser } from '../_core/models/IUser';
import Users from '../_infrastructures/models/users';
import { IUserVM } from '../_core/models/IUserVM';

router.post("/local/register", auth.optional, async function(req, res) {
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

  try {
    
    const userAuth = await IoC.userLocalService.register(email, password);
    return res.json(userAuth);

  } catch (error) {
    return res.status(400).json(error);
  }
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

  return passport.authenticate('local', { session: false }, async (err, passportUser: IUserVM, info) => {
    if(err) {
      console.log("err on authen", err);
      return res.status(400)
      .json({ error: err })
    }

    if(passportUser) {
      const authUser = await IoC.userLocalService.login(passportUser.userName);

      return res.json(authUser);
    }

    return res.status(400);
  })(req, res, next);
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