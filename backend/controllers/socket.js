exports.onConnection =  (socket) => {
    console.log('a user connected widh id: ' + socket.id);

    // Handle message event
    socket.on('message', function (message) {
        io.sockets.emit('message', message);
    });

    // Handle typing event
    socket.on('feedback', function (data) {
        socket.broadcast.emit('feedback', data);
    });
};