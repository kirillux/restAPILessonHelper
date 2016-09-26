/**
 * Created by Kirill on 9/19/2016.
 */
'use strict';
const userApi = {};

userApi.register = function (server,options,next) {
    //Implement routes
    const userRoutes = require('./user-routes');
    server.route(userRoutes);
    const adminRoutes = require('./user-admin-routes');
    server.route(adminRoutes);
    next();
};
userApi.register.attributes =
{
    name: 'UserApi',
    version:'1.0.0'
};
module.exports = userApi;