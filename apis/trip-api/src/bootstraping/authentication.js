const AuthBearer = require('hapi-auth-bearer-token');

async function addAuth(server) {

    await server.register(AuthBearer)

    server.auth.strategy('simple', 'bearer-access-token', {
        
        allowQueryToken: true, // optional, false by default
        validate: async (request, token, h) => {
            console.log(token);

            // here is where you validate your token
            // comparing with token from your database for example
            const isValid = token === '1234';

            const credentials = {
                token
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