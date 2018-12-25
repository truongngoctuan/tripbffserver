const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

module.exports = function(app) {
  app.post("/local/register", auth.optional, function(req, res) {
    const { body: { user } } = req;

    if(!user.email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
        },
      });
    }
  
    if(!user.password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }
  
    const finalUser = new Users(user);
  
    finalUser.setPassword(user.password);
  
    return finalUser.save()
      .then(() => res.json({ user: finalUser.toAuthJSON() }));
  });
};
