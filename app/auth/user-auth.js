/**
 * Created by Kirill on 9/20/2016.
 */
'use strict';
const BasicAuth = require('hapi-auth-basic');
const UserModel = new require('../models/user');

const userAuth = {};

userAuth.login = function (request, reply) {
    let userId = request.payload.id;
    let password = request.payload.password;
    UserModel.find({_id: userId}, function (error, data) {
        if(error){
            reply(error);
        }
        else{
            reply(data);
        }

    });

};

module.exports = userAuth;