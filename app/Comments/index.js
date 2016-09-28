/**
 * Created by Kirill on 9/26/2016.
 */
'use strict';
const commentApi = {};

commentApi.register = function (server,options,next) {
    //Implement routes
    const commentRoutes = require('./comment-routes');
    server.route(commentRoutes);
    next();
};
commentApi.register.attributes =
{
    name: 'commentApi',
    version:'1.0.0'
};
module.exports = commentApi;