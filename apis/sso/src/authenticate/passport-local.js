const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

// expose this function to our app using module.exports
module.exports = function (passport) {

    passport.use(new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true, // allows us to pass back the entire request to the callback
            // session: false,
        },
        function (req, email, password, done) { // callback with email and password from our form
            console.log("local user login", `${email}:${password}`);

            // var fakeUser = {
            //     username: email,
            //     name: email,
            //     id: 1,
            // }

            Users.findOne({ email })
                .then((user) => {
                    if(!user || !user.validatePassword(password)) {
                        return done(null, false, { errors: { 'email or password': 'is invalid' } });
                    }

                    return done(null, user);
                }).catch(done);

        }));
};