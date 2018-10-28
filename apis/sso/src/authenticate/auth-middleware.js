const config = require('../config');

const jwt = require('jsonwebtoken');
const moment = require('moment');

var redis = require("redis"),
    client = redis.createClient({
        host: config.redisStore.host,
        port: config.redisStore.port,
    })

client.on("error", function (err) {
    console.log("Error " + err);
});


checkRedisStatus();

function authenticationMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }
}

function checkRedisStatus() {
    client.keys(`${config.auth.keyPrefix}:*`, (err, replies) => {
        console.log(`login-sessions: ${replies.length}`);
        var lastKey = replies[replies.length - 1];
        console.log(lastKey)
        client.get(lastKey, (err, reply) => console.log(reply));
    });
}
function generateJwt(req, res) {
    console.log("generateJwt")
    console.log("user")
    console.log(req.user)

    const user = req.user;

    const token = jwt.sign(user, 'your_jwt_secret'); //TODO get secret from config file something

    var expiredTime = moment().add(config.auth.TTLInSeconds, 'seconds');
    var data = {
        user,
        token: {
            access_token: token,
            expired: expiredTime,
        }
    }
    client.set(`${config.auth.keyPrefix}:${token}`, JSON.stringify(data), "EX", config.auth.TTLInSeconds);
    checkRedisStatus();

    return res.json({
        user,
        token
    });

    // todo somehow add function `login` and `logout`, similar to the one from `session`
    // req.login(user, {
    //     session: false,
    // }, err => {
    //     if (err) {
    //         res.send(err);
    //     }

    //     // generate a signed son web token with the contents of user object and return it in the response
    //     const token = jwt.sign(user, 'your_jwt_secret');
    //     return res.json({
    //         user,
    //         token
    //     });
    // })
}

function login(req, res) {
    return generateJwt(req, res); // return { user: {}, token: "" }
}

function logout() {

}

module.exports = {
    // isLoggedIn: authenticationMiddleware,
    login,
    logout,
}