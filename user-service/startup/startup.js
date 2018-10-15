//we use redis as message broker for now

var discoveryAgent = require('platform-common/discovery/agent.discovery')

discoveryAgent.init({ "serviceTag": "user-service" });

discoveryAgent.consume(function (context, action, payload) {
    //TODO: handle business
    if ("LOGIN" === action) {
        console.log("detect LOGIN request");
        console.log("context: " + JSON.stringify(context));
        console.log("payload: " + JSON.stringify(payload));

        var response = {
            "context": context,
            "callback": {
                "code": 200,
                "data": {
                    "user-service": "hello"
                }
            }
        };

        discoveryAgent.reply(context, response);
    }
});

console.log("user-service is ready");


