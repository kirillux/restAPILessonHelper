/**
 * Created by Kirill on 9/19/2016.
 */
'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let userSchema = new Schema({
    email: String,
    username: {type: String, unique: true},
    password: String,
    created: { type: Date, default: Date.now }

});
module.exports = Mongoose.model('User', userSchema, 'User');