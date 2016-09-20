/**
 * Created by Kirill on 9/19/2016.
 */
'use strict';
const vakApi = {};
vakApi.register = function (server,options, next) {
    const routes = require('./vak-routes');
    server.route(routes);
    next();
};

vakApi.register.attributes = {
    name: 'vakApi',
    version: '1.0.0'
};

module.exports = vakApi;