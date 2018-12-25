const config = require('../config');
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

function checkRedisStatus() {
    client.keys(`${config.auth.keyPrefix}:*`, (err, replies) => {
        console.log(`login-sessions: ${replies.length}`);
        var latestKey = replies[0];
        console.log(latestKey)
        client.get(latestKey, (err, reply) => console.log(reply));
    });
}
function addToSession(user, token) {
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
}

module.exports = {
  addToSession
}