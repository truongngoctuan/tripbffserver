const auth = require('../auth');

import express from 'express';
const router = express.Router();

import { IoC } from '../IoC';

//POST login route (optional, everyone has access)
router.post('/device/login', auth.optional, async (req, res, next) => {
  const { body: { uniqueDeviceId } } = req;
  console.log("device:" + uniqueDeviceId);

  if (!uniqueDeviceId) {
    return res.status(422).json({
      errors: {
        uniqueDeviceId: 'is required',
      },
    });
  }

  try {
    const dbUser = await IoC.userDeviceService.getById(uniqueDeviceId);

    if (dbUser) {
      const authUser = await IoC.userDeviceService.login(uniqueDeviceId);
      return res.json(authUser);
    }

    const newUser = await IoC.userDeviceService.register(uniqueDeviceId);
    console.log("new user", newUser);
    const result = await IoC.userDeviceService.login(uniqueDeviceId);
    return res.json(result);
  }
  catch (e) {
    console.log(e);
    throw e;
  }
});

module.exports = router;