/**
 * Created by Kirill on 9/21/2016.
 */
'use strict';
const UserModel = new require('../models/user');
const bcrypt = require('bcryptjs');

const userAuth = {};

userAuth.login = function (request, reply) {
    let userId = request.payload.id;
    let password = request.payload.password;

    UserModel.find({_id: userId}, function (error, data) {
        console.log(data[0].password);
        bcrypt.compare('bacon',data[0].password, function(error,result)
        {
            if(error)
            {
                reply(error);
            }
            else{
                reply(result);
            }
        });
    });
};


module.exports = userAuth;