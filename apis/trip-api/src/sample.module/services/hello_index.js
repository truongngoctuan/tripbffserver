const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.1.1:27017/');
//test mongodb connection
mongoose.connection.once('open', () => {
    console.log('connected to mongodb database');
});

const Foo = require('../infrastructures/models/Foo')
module.exports = {
    index: function(params) {
        var fooDB = Foo.find();
        return fooDB;
    }
}