
var exports = module.exports = {};

var redis = require('redis')
uuid = require('uuid/v4');
var pubisher, subscriber, consumer, serviceTag, instanceId, callbackMap = {};

exports.init = function (configuration) {
    serviceTag = configuration.serviceTag; //unique per service - predefined
    instanceId = serviceTag + "." + uuid(); //unique id to represent this instance - also used as response channel for other service to reply back
    pubisher = redis.createClient(); //used for publish message to redis only
    subscriber = redis.createClient(); //used for subscribe message from redis only
    consumer = redis.createClient(); //used to pop message from redis only

    pubisher.on("error", function (err) {
        console.log("error on redis connection: " + err);
    });

    pubisher.on("connect", function () {
        console.log("redis connection is established");
    });

    pubisher.on("ready", function () {
        console.log("redis connection is ready");
    });

    subscriber.on("subscribe", function (channel, count) {
        console.log("subscribed on channel = " + channel);
    });

    subscriber.on("message", function (channel, message) {
        console.log("message " + message);
        var callbackMessage = JSON.parse(message);

        callbackMap[callbackMessage.context.messageId](callbackMessage.callback);
        delete callbackMap[callbackMessage.context.messageId];
    });
    subscriber.subscribe(instanceId);
}

var _messageParser = function (rawMessage, messageHandler) {
    var requestMessage = JSON.parse(rawMessage);
    var action = requestMessage.action;
    var context = requestMessage.context;
    var payload = requestMessage.payload;
    messageHandler(context, action, payload);
}
var _consume = function (messageHandler) {
    consumer.blpop(serviceTag, 0, function (err, messages) {
        console.log("message: " + messages[1]);
        // messageHandler(messages[1]);
        _messageParser(messages[1], messageHandler);
        _consume(messageHandler);
    });
}

exports.consume = function (messageHandler) {
    _consume(messageHandler);
}

/**
 * send a request Json object to a specific service
 * @param {*} serviceTag unique per service
 * @param {*} messageJson MUST be a valid Json Object
 * @param {*} callback 
 */
exports.send = function (serviceTag, messageJson, callback) {
    console.log("publish message to serviceTag: " + serviceTag);
    var messageId = uuid(); //only need to be unique in context of this instance
    
    //context is the most important in messageJson
    //context define unique constraints which determine how a message will be routed:
    //      - instanceId: help other services knows where to reply to
    //      - messageId: mapped with callback which help this service know to find which callback when response from other services 
    messageJson.context = {
        "instanceId": instanceId,
        "messageId": messageId
    };

    //mapping callback with messageId
    callbackMap[messageId] = callback;

    //currently we use redis as message broker.
    //each service will have a queue in redis to store message as json string format
    //we are using rpush to push message to bottom of queue. 
    pubisher.rpush(serviceTag, JSON.stringify(messageJson));
}

exports.reply = function (context, response) {
    pubisher.publish(context.instanceId, JSON.stringify(response));
}

return exports;