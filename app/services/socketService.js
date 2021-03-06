/**
 * Created by Kirill on 10/6/2016.
 */
const Server = require('socket.io');
const sockets = {};
const socketService = {};

socketService.init = function (listener) {
// check if server already exists (return)
    // else do nothing
    let server = new Server(listener, {});
    server.on('connection', function (socket) {

        for (key in sockets) {
            console.log(key);
            socketService.send("Connected user: " + socket.id, key);
    };
        sockets[socket.id] = socket;
        socket.on('disconnect', function () {
            socketService.disconnect(socket.id);
        });

    });
};

socketService.send = function (message, socketId) {
    sockets[socketId].emit('comment message', message);
};

socketService.sendAll = function (message) {
    for (let key in sockets) {
        socketService.send(message,key);
        //sockets[key].emit('comment message', message);
    }
};
socketService.disconnect = function (id) {
    try {
        delete sockets[id];
    } catch (error) {
        console.log(error);
    }
};

module.exports = socketService;