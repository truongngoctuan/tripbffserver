import axios from "axios";
import passport from 'passport';
const auth = require('../auth');

import express from 'express';
const router = express.Router();

import { IoC } from '../IoC';
import Users from '../_infrastructures/models/users';
import { IUserVM } from '../_core/models/IUserVM';
import { json } from "body-parser";

// app.get('/auth/facebook',
//   passport.authenticate('facebook'));

const FACEBOOK_APP_ID = '2341289862566899';
const FACEBOOK_APP_SECRET = 'fb968c05bbcda85d56acd9c50304750f';

router.post('/facebook/verify',
  //  passport.authenticate('facebook', { failureRedirect: '/login' }),
  async (req, res, next) => {
    const { body: { access_token, user_id } } = req;

    const dbUser = await IoC.userFacebookService.getById(user_id);
    console.log("db user", dbUser);

    if (dbUser) {
      if (await IoC.userFacebookService.authenticate(user_id, access_token)) {
        return res.json(await IoC.userFacebookService.login(user_id));
      }
      return res.json({ error: "authen_failed"});
    }

    const newUser = await IoC.userFacebookService.register(user_id, access_token);
    console.log("new user", newUser);
    const result = await IoC.userFacebookService.login(user_id);
    return res.json(result);
  });

module.exports = router;