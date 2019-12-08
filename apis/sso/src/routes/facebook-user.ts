import express from 'express';
const router = express.Router();

import { IoC } from '../IoC';

router.post('/facebook/verify',
  //  passport.authenticate('facebook', { failureRedirect: '/login' }),
  async (req, res, next) => {
    const { body: { access_token, user_id, logged_user_id } } = req;
  
    const dbUser = await IoC.userFacebookService.getById(user_id);
    console.log("db user", dbUser);

    if (dbUser) {
      const verification = await IoC.userFacebookService.getVerification(access_token);

      if (await IoC.userFacebookService.authenticate(user_id,
        verification.app_id,
        verification.user_id,
        verification.is_valid)) {
          const result2 = await IoC.userFacebookService.login(user_id, access_token);
          console.log("logged in 2", result2);
          return res.json(result2);
      }
      return res.json({ error: "authen_failed"});
    }

    const user = await IoC.userFacebookService.register(user_id, access_token, logged_user_id);
    console.log("new user", user);

    const result = await IoC.userFacebookService.login(user_id, access_token);
    console.log("logged in", result);
    return res.json(result);
  });

module.exports = router;