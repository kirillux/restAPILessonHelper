/**
 * Created by Kirill on 9/23/2016.
 */
'use strict';
//Load Auth plugin
const Basic = require('hapi-auth-basic');
const basicAuth = {};

basicAuth.register = function(server,options,next) {

    server.register(Basic, (err) => {
        if (err) {
            throw err;
        }
        const authFunction = require('./basic-auth-handler');
        server.auth.strategy('simple','basic', {
            validateFunc: authFunction.authValidate,
        });
        //Setup default
        server.auth.default({
            strategy: 'simple',
            scope: ['admin','user'],
        });

        next();
    });
};
basicAuth.register.attributes = {
    name: 'auth'
};

module.exports = basicAuth;

