const auth = require('../auth');

import express from 'express';
const router = express.Router();

import { IoC } from '../IoC';

//POST login route (optional, everyone has access)
router.post('/device/login', auth.optional, async (req, res, next) => {
  const { body: { uniqueDeviceId } } = req;

  if(!uniqueDeviceId) {
    return res.status(422).json({
      errors: {
        uniqueDeviceId: 'is required',
      },
    });
  }

  if (IoC.userDeviceService.getById(uniqueDeviceId)) {
    const authUser = await IoC.userDeviceService.login(uniqueDeviceId);
    return res.json(authUser);
  }

  const newUser = await IoC.userDeviceService.register(uniqueDeviceId);
  console.log("new user", newUser);
  const result = await IoC.userDeviceService.login(uniqueDeviceId);
  return res.json(result);

});

module.exports = router;