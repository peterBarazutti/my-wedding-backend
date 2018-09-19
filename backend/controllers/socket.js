const weddingController = require('../controllers/weddings');
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
        let messageObj = JSON.parse(message);
        socket.emit('message', message);
        socket.broadcast.to(messageObj.wedding).emit('message', message);
        weddingController.addMessageToWedding(messageObj.wedding, messageObj.name, messageObj.message)
    });

    // Handle typing event
    socket.on('feedback', (feedback) => {
        let messageObj = JSON.parse(feedback);
        socket.broadcast.to(messageObj.wedding).emit('feedback', feedback);
    });

    socket.on('room', (wedding) => {
        console.log("joining room: " + wedding);
        socket.join(wedding);
    });

    socket.on('disconnect', function () {
        var i = onlineUsers.indexOf(socket);
        onlineUsers.splice(i, 1);
        socket.emit('online-users', onlineUsers);
        socket.broadcast.to(wedding).emit('online-users', onlineUsers);
    });
};

