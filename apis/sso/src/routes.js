const jwt = require('jsonwebtoken');

module.exports = function (app, passport) {
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.get('/dashboard', function (req, res) {
        console.log("dashboard")
        res.send(`dashboard`)
    });

    app.get('/login2', (req, res) => {
        // console.log(req)
        res.send("login failed")
    })
    // process the login form
    app.post('/login', passport.authenticate('local', {
        // successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login2', // redirect back to the signup page if there is an error
        failureFlash: true, // allow flash messages
        session: false,
    }), function (req, res) {
        console.log("here it went")
        console.log(req.user)

        const user = req.user;

        req.login(user, {
            session: false,
        }, err => {
            if (err) {
                res.send(err);
            }

            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({
                user,
                token
            });
        })
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

}