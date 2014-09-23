var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

io.on('connection', function (socket) {
    console.log('A user connected.');

    socket.on('disconnect', function () {
        console.log('User disconnected.');
    });

    socket.on('chat-message', function (msg) {
        console.log('Message: ' + msg);
        io.emit('chat-message', msg);
    });
});
