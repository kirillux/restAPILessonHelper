/**
 * Created by Kirill on 9/19/2016.
 */
'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const bcrypt = require('bcryptjs');

let userSchema = new Schema({
    email: String,
    username: {type: String, unique: true},
    password: String,
    scope: { type : Array , default : [] },
    created: { type: Date, default: Date.now }

});
userSchema.pre('save', function(next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate auto salt and hash
    bcrypt.hash('bacon', 8, function(error, hash) {
        if (error) return next(error);
        user.password = hash;
        next();
    });
});

module.exports = Mongoose.model('User', userSchema, 'User');