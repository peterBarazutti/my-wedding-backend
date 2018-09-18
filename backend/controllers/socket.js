let onlineUsers = [];

exports.onConnect = (socket) => {
    let wedding = socket.handshake.query.wedding;
    socket.join(wedding);

    onlineUsers.push({
        name: socket.handshake.query.name,
        socket: socket.id
    });

    socket.emit('online-users', onlineUsers);
    socket.broadcast.to(wedding).emit('online-users', onlineUsers);


    // Handle message event
    socket.on('message', (message) => {
        console.log(socket.id + " is messaging");
        socket.emit('message', message);
        socket.broadcast.to(wedding).emit('message', message);
    });

    // Handle typing event
    socket.on('feedback', (data) => {
        socket.broadcast.to(wedding).emit('feedback', data);
    });

    socket.on('disconnect', function () {
        var i = onlineUsers.indexOf(socket);
        onlineUsers.splice(i, 1);
        socket.emit('online-users', onlineUsers);
        socket.broadcast.to(wedding).emit('online-users', onlineUsers);
    });
};

