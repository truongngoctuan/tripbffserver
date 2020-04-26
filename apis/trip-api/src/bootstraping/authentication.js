const AuthBearer = require("hapi-auth-bearer-token");
const jwt = require("jsonwebtoken");

// const PREFIX = "login-session";
// var redis = require("redis"),
//     client = redis.createClient({
//         host: process.env.REDIS_HOST,
//         port: process.env.REDIS_PORT
//     })

// client.on("error", function (err) {
//     console.log("Error " + err);
// });

// async function getAsync(key) {
//     return new Promise((resolve, reject) => {
//         client.get(key, (err, reply) => {
//             if (err) return reject(err);
//             resolve(JSON.parse(reply));
//         });
//     });
// }

// function verifyWhiteList(request, token, h) {
//     console.log(token);
//     console.log(`${request.route.method} ${request.route.path}`);

//     var session = await getAsync(`${PREFIX}:${token}`);

//     if (!session) {
//         return {
//             isValid: false,
//             credentials: null,
//             artifacts: null
//         };
//     }

//     // here is where you validate your token
//     // comparing with token from your database for example
//     const isValid = true;

//     const credentials = {
//         token: session.token.access_token,
//         user: session.user,
//     };
//     const artifacts = {
//         test: 'info'
//     };

//     return {
//         isValid,
//         credentials,
//         artifacts
//     };
// }

async function addAuth(server) {
  await server.register(AuthBearer);

  server.auth.strategy("simple", "bearer-access-token", {
    allowQueryToken: true, // optional, false by default
    validate: async (request, token, h) => {
      // console.log(token);
      // console.log(`${request.route.method} ${request.route.path}`);
      let decoded =  "";

      try {
        decoded = jwt.verify(token, "secret");
        console.log("decoded", decoded.userName);
      } catch (err) {
        console.log("verify error", err);
        return {
          isValid: false,
          credentials: null,
          artifacts: null,
        };
      }

      const isValid = true;

      const { userName, id } = decoded;

      const credentials = {
        token,
        user: { id, userName },
      };
      const artifacts = {
        test: "info",
      };

      return {
        isValid,
        credentials,
        artifacts,
      };
    },
  });

  // server.auth.default('simple');
}

module.exports.addAuth = addAuth;
// module.exports.getAsync = getAsync;
