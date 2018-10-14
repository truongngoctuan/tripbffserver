const logger = require('../common/logger');
// const mongoose = require('mongoose');

// var exports = module.exports = {};

// var opt = {
//     user: 'root',
//     pass: 'password',
//     auth: {
//         authdb: 'admin'
//     }
// };

// var userSchema = new mongoose.Schema({
//     userId: Number,
//     auth: {
//         anonymous: {
//             device_id: String
//         },
//         standard: {
//             username: String,
//             password: String
//         }
//     }
// });

// var UserModel = mongoose.model('user', userSchema);

// exports.doLogin = function (requestHeaders, requestBodyAsBuffer, callback) {
//     logger.log("handling login call")
//     let requestBodyAsJson = {};

//     try {
//         requestBodyAsJson = JSON.parse(requestBodyAsBuffer.toString());
//     } catch (err) {
//         logger.log("unable to parse requestBody: %s", err.message);
//     }

//     let username = requestBodyAsJson.username;
//     let password = requestBodyAsJson.password;

//     var db = mongoose.connection;

//     mongoose.connect('mongodb://localhost/authDb', opt);

//     db.on('error', function (err) {
//         console.log("connection error");
//     });
//     db.once('open', function () {
//         console.log("connection established");

//         var UserModel = mongoose.model('user', userSchema);
//         // UserModel.findOne({ 'auth.standard.username': 'admin' }, 'userId', function (err, user) {
//         UserModel.findById('5bbb51e249d60f00076f7ba6', 'userId', function (err, user) {
//             if (user === undefined || user === null) {
//                 console.log('user un-authenticated');
//                 callback({
//                     "code": 401
//                 })
//             } else {
//                 console.log("found user: %s", user.toString());
//                 callback({
//                     "code": 200,
//                     "data": {
//                         "userId": user.userId,
//                     }
//                 });
//             }
//         });
//     });
// };

var discoveryAgent = require('../discovery/agent.discovery');


exports.doLogin = function(requestHeaders, requestBodyAsBuffer, callback) {
    logger.log("handling login call")
    let requestBodyAsJson = {};

    try {
        requestBodyAsJson = JSON.parse(requestBodyAsBuffer.toString());
    } catch (err) {
        logger.log("unable to parse requestBody: %s", err.message);
    }

    let username = requestBodyAsJson.username;
    let password = requestBodyAsJson.password;

    let message = {
        "action": "LOGIN",
        "payload": {
            "username": username,
            "password": password
        }
    }

    discoveryAgent.publish("user-service", message, callback);
    // callback({
    //     "code": 201,
    //     "data": {}
    // });




    // var db = mongoose.connection;

    // mongoose.connect('mongodb://localhost/authDb', opt);

    // db.on('error', function (err) {
    //     console.log("connection error");
    // });
    // db.once('open', function () {
    //     console.log("connection established");

    //     var UserModel = mongoose.model('user', userSchema);
    //     // UserModel.findOne({ 'auth.standard.username': 'admin' }, 'userId', function (err, user) {
    //     UserModel.findById('5bbb51e249d60f00076f7ba6', 'userId', function (err, user) {
    //         if (user === undefined || user === null) {
    //             console.log('user un-authenticated');
    //             callback({
    //                 "code": 401
    //             })
    //         } else {
    //             console.log("found user: %s", user.toString());
    //             callback({
    //                 "code": 200,
    //                 "data": {
    //                     "userId": user.userId,
    //                 }
    //             });
    //         }
    //     });
    // });
};

return exports;