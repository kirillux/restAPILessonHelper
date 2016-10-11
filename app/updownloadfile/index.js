/**
 * Created by Kirill on 9/29/2016.
 */
'use strict';
const fileRoutesApi = {};

fileRoutesApi.register = function (server,options,next) {
    //Implement routes
    const upDownloadRoutes = require('./file-routes');
    server.route(upDownloadRoutes);
    const upDownloadRoutesVak = require('./file-routes-vak');
    server.route(upDownloadRoutesVak);
    next();
};
fileRoutesApi.register.attributes =
{
    name: 'FileRoutesApi',
    version:'1.0.0'
};
module.exports = fileRoutesApi;