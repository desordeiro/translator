var socketIO = require('socket.io');

function socketActions(httpServer) {

    var io = socketIO(httpServer);

    io.on('connection', function (socket) {
        socket.broadcast.emit('user connected', {
            name: 'anon',
            color: 'green'
        });

        socket.on('text changed', function (data) {
            io.emit('text changed', data.text);
        })

        socket.on('disconnect', function () {
            socket.broadcast.emit('user disconnected', {
                name: 'anon',
                color: 'green'
            });
        })
    });

}

module.exports = socketActions;