
var exports = module.exports = {};


var redis = require('redis')
uuid = require('uuid/v4');
var pub = redis.createClient(), sub = redis.createClient();

pub.on("error", function (err) {
    console.log("error on redis connection: " + err);
});

pub.on("connect", function () {
    console.log("redis connection is established");
});

pub.on("ready", function () {
    console.log("redis connection is ready");
});

sub.on("subscribe", function (channel, count) {
    console.log("subscribed on channel = " + channel + " count = " + count);
});

var callbackMap = {};
sub.on("message", function (channel, message) {
    console.log("message " + message);
    var callbackMessage = JSON.parse(message);

    callbackMap[callbackMessage.context.messageId](callbackMessage.callback);
    delete callbackMap[callbackMessage.context.messageId];
});

//TODO: service will subscribe on a unique queue for data return. It is different from endpoint queue
var instanceId = "router-service" + "." + uuid();
sub.subscribe(instanceId);


exports.publish = function (serviceTag, message, callback) {
    console.log("publish message to serviceTag: " + serviceTag);
    var messageId = uuid();
    message.context = {
        "instanceId": instanceId,
        "messageId": messageId
    };

    callbackMap[messageId] = callback;
    // pub.rpush(serviceTag, JSON.stringify(message), function(r){
    //     console.log("push result: " + r);
    // });

    // pub.rpush.apply(serviceTag, [JSON.stringify(message)]);
    pub.rpush(serviceTag, JSON.stringify(message));

    // pub.publish(serviceTag, JSON.stringify(message));
}

return exports;