/** Created by Kirill on 9/13/2016. */
'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    created: { type: Date, default: Date.now }

});

module.exports = Mongoose.model('User', userSchema, 'User');