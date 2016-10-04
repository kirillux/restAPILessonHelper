/**
 * Created by Kirill on 10/4/2016.
 */
const commentSocket = {};
const commentSocketRoutes = require('./realtimeComment-routes');

commentSocket.register = function (server, options, next) {
    //Initialize routes
    server.route(commentSocketRoutes);
    //Setup listener
    let io = require('socket.io')(server.listener);

    io.on('connection', function (socket) {
        console.log('a user connected');
        console.log(io.engine.clientsCount);

        io.emit('chat message', 'Welkom bij mijn chat server hier komen vette comments');
        //Chat message
        socket.on('chat message', function (msg) {
            console.log('message: ' + msg);
            io.emit('chat message', msg);

        });
        // on disconnect
        socket.on('disconnect', function () {
            console.log('user disconnected');
            console.log(io.engine.clientsCount);
        });
    });
    next();

};


commentSocket.register.attributes =
{
    name: 'comments real-time socket.io',
    version: '1.0.0'
};
module.exports = commentSocket;
