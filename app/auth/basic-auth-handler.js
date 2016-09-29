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
    UserModel.findById({_id: username}, function (error, data) {
        Bcrypt.compare(password, data.password, (err, isValid) => {
            callback(err, isValid, { _id: data._id, name: data.username, scope: data.scope });
        });
    });
};

module.exports = authHandler;