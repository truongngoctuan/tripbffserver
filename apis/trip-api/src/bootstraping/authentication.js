const config = require('../config')
const AuthBearer = require('hapi-auth-bearer-token');
const PREFIX = "login-session";
var redis = require("redis"),
    client = redis.createClient({
        host: config.redisStore.host,
        port: config.redisStore.port,
    })

client.on("error", function (err) {
    console.log("Error " + err);
});

async function getAsync(key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
            if (err) return reject(err);
            resolve(JSON.parse(reply));
        });
    });
}
async function addAuth(server) {

    await server.register(AuthBearer)

    server.auth.strategy('simple', 'bearer-access-token', {

        allowQueryToken: true, // optional, false by default
        validate: async (request, token, h) => {
            console.log(token);

            var session = await getAsync(`${PREFIX}:${token}`);
            if (!session) {
                return {
                    isValid: false,
                    credentials: null,
                    artifacts: null
                };
            }

            console.log(session)

            // here is where you validate your token
            // comparing with token from your database for example
            const isValid = true;

            const credentials = {
                token: session.token.access_token,
                user: session.user,
            };
            const artifacts = {
                test: 'info'
            };

            return {
                isValid,
                credentials,
                artifacts
            };
        }
    });

    // server.auth.default('simple');

}

module.exports.addAuth = addAuth;
module.exports.getAsync = getAsync;