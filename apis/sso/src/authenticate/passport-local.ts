import { IoC } from "../IoC";

const LocalStrategy = require('passport-local').Strategy

// expose this function to our app using module.exports
module.exports = function (passport) {

    passport.use(new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true, // allows us to pass back the entire request to the callback
            // session: false,
        },
        async function (req, email, password, done) { // callback with email and password from our form
            console.log("local user login", `${email}:${password}`);

            //todo remove auto register :D
            const userDb = await IoC.userLocalService.getById(email);
            console.log('user DB', userDb);

            if (!userDb) {
                await IoC.userLocalService.register(email, password);
            }

            IoC.userLocalService.authenticate(email, password)
            .then(user => {
                return done(null, user);
            }).catch(err => {
                console.log("done authen with err", err);

                return done(null, false, { errors: err });
            });

        }));
};