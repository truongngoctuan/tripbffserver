import * as authMiddleware from './authenticate/auth-middleware';

module.exports = function (app, passport) {
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.get('/unauthorised', (req, res) => res.send("unauthorised"))

    app.get('/dashboard', isLoggedIn, function (req, res) {
        console.log("dashboard")
        res.send(`dashboard`)
    });

    

    // process the login form
    app.post('/login', passport.authenticate('local', {
        //failureRedirect: '/login2', // redirect back to the signup page if there is an error
        failureFlash: false, // allow flash messages
        session: false,
    }), function (req, res) {
        console.log('come here login api ');
        return authMiddleware.login(req, res);
    });

    //TODO: logout does not work for sure :D

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });    

    // TODO add this kind of function into hapi in `consumer-api`
    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/unauthorised');
    }

}