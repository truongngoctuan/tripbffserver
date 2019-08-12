const config = require('./config.js')
require('dotenv').config() //read config from .env file

const express = require('express')

const mongoService = require("./bootstraping/mongo-connection");
mongoService.init();

// const session = require('express-session')
// const RedisStore = require('connect-redis')(session)
// var flash = require('connect-flash');

var passport = require('passport');

var bodyParser   = require('body-parser');

const app = express()
const port = process.env.SERVER_PORT;

// app.use(session({
//     store: new RedisStore({
//         url: config.redisStore.url,
//         port: config.redisStore.port,
//     }),
//     secret: config.redisStore.secret,
//     resave: false,
//     saveUninitialized: false
// }))

require('./authenticate/passport-local')(passport);

app.use(bodyParser()); // get information from html forms

// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes')(app, passport); // load our routes and pass in our app and fully configured passport

//https://medium.freecodecamp.org/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e
app.use(require('./routes/local-user'));
app.use(require('./routes/facebook-user'));
app.use(require('./routes/device-user'));
app.use(require('./routes/user-setting'));

app.listen(port, () => console.log(`Example app listening on port ${port}! http://localhost:${port}`))