//we use redis as message broker for now
//setup redis
var redis = require('redis');
var sub = redis.createClient(), pub = redis.createClient();

// sub.on("subscribe", function (channel, count) {
//     console.log("subscribed on channel = " + channel + " count = " + count);
// });

// sub.on("message", function (channel, message) {
//     console.log("message = " + message);


// });


var messageHandler = function(message){
        //TODO: handle business
        var requestMessage = JSON.parse(message);
        var action = requestMessage.action;
        var context = requestMessage.context;
    
        if ("LOGIN" === action) {
            console.log("detect LOGIN request");
            console.log("context: " + context);
    
            var callbackMessage = {
                "context": context,
                "callback": {
                    "code": 200,
                    "data": {
                        "user-service": "hello"
                    }
                }
            };
    
            pub.publish(context.instanceId, JSON.stringify(callbackMessage));
        }
}

// sub.subscribe("user-service");
// sub.blpop("user-service", 0, function (err, message) {
//     console.log("lpop message: " + message);
// });


var consumer = function() {
    sub.blpop("user-service", 0, function (err, messages) {
        console.log("lpop message: " + messages[1]);
        messageHandler(messages[1]);
        consumer();
    }); 
}

consumer();






