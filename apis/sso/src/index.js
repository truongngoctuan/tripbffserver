const config = require('./config.js')
require('dotenv').config() //red config from .env file

const express = require('express')

const mongoService = require("./bootstraping/mongo-connection");
mongoService.init();

require('./models/Users');
// const session = require('express-session')
// const RedisStore = require('connect-redis')(session)
// var flash = require('connect-flash');

var passport = require('passport');

var bodyParser   = require('body-parser');

const app = express()
const port = config.app.port

// app.use(session({
//     store: new RedisStore({
//         url: config.redisStore.url,
//         port: config.redisStore.port,
//     }),
//     secret: config.redisStore.secret,
//     resave: false,
//     saveUninitialized: false
// }))

require('./authenticate/passport-local.js')(passport);

app.use(bodyParser()); // get information from html forms

// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.use(require('./routes/local-user.js'));

app.listen(port, () => console.log(`Example app listening on port ${port}! http://localhost:${port}`))