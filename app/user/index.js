/**
 * Created by Kirill on 9/19/2016.
 */
'use strict';
const userApi = {};

userApi.register = function (server,options,next) {
    //Implement routes
    const routes = require('./user-routes');
    server.route(routes);
    next();
};

userApi.register.attributes =
{
    name: 'UserApi',
    version:'1.0.0'
};
module.exports = userApi;