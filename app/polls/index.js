/**
 * Created by Kirill on 10/12/2016.
 */
/**
 * Created by Kirill on 9/26/2016.
 */
'use strict';
const pollApi = {};

pollApi.register = function (server,options,next) {
    //Implement routes
    const pollRoutes = require('./poll-routes');
    server.route(pollRoutes);
    const pollRoutesVak = require('./poll-routes-vak');
    server.route(pollRoutesVak);
    next();
};
pollApi.register.attributes =
{
    name: 'pollApi plugin',
    version:'1.0.0'
};
module.exports = pollApi;