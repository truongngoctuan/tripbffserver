import passport from 'passport';
const auth = require('../auth');
import {Express} from "express";

import { IoC } from '../IoC';
import { IUser } from '../_core/models/IUser';
import Users from '../_infrastructures/models/users';

export function init(app: Express) {

  app.post("/local/register", auth.optional, async function(req, res) {
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
  app.post('/local/login', auth.optional, (req, res, next) => {
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
  
    return passport.authenticate('local', { session: false }, async (err, passportUser: IUser, info) => {
      if(err) {
        return next(err);
      }
  
      if(passportUser) {
        const authUser = await IoC.userLocalService.login(passportUser.email);
  
        return res.json(authUser);
      }
  
      return res.status(400);
    })(req, res, next);
  });
  
  //GET current route (required, only authenticated users have access)
  app.get('/local/current', auth.required, (req, res, next) => {
    const { body: { id } } = req;
  
    return Users.findById(id)
      .then((user) => {
        if(!user) {
          return res.sendStatus(400);
        }
  
        return res.json({ user: user.toAuthJSON() });
      });
  });
}
