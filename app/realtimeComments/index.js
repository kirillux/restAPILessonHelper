/**
 * Created by Kirill on 10/4/2016.
 */
const commentSocket = {};
const commentSocketRoutes = require('./realtimeComment-routes');
const handlers = require('../Comments/comment-handlers');
const socketService = require('../services/socketService');

commentSocket.register = function (server, options, next) {
    //Initialize routes
    server.route(commentSocketRoutes);

    socketService.init(server.select('api').listener);

    next();

};


commentSocket.register.attributes =
{
    name: 'comments real-time socket.io',
    version: '1.0.0'
};
module.exports = commentSocket;
