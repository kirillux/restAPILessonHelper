/**
 * Created by Kirill on 9/23/2016.
 */
'use strict';
const UserModel = new require('../models/user');
const Bcrypt = require('bcryptjs');

const authHandler = {};

authHandler.authValidate = function (request, username, password, callback) {
    if(!username)
    {
        return callback(null, false);
    }
    UserModel.find({_id: username}, function (error, data) {
        Bcrypt.compare(password, data[0].password, (err, isValid) => {
            callback(err, isValid, { _id: data[0]._id, name: data[0].username, scope: data[0].scope });
        });
    });

};

module.exports = authHandler;