import express from 'express';
const router = express.Router();

import { IoC } from '../IoC';

router.patch('/setting/locale',
  async (req, res, next) => {
    const { body: { userId, locale } } = req;
    const dbUser = await IoC.userService.getById(userId);

    if (dbUser) {
        var isSuccess = await IoC.userService.updateUserLocale(userId, locale);    
        return res.json({ "isSuccess": isSuccess});    
    }
    
    return res.json({ error: "user not found"});
});

module.exports = router;