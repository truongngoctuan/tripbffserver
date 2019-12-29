const Inert = require("inert");
const Vision = require("vision");
const HapiSwagger = require("hapi-swagger");
const Pack = require("../../package");

async function addSwaggerUi(server) {

    const swaggerOptions = {
        info: {
            title: "Test API Documentation",
            version: Pack.version,
        },
    };
    
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
}

module.exports.addSwaggerUi = addSwaggerUi;