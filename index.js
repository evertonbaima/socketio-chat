var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

//var users = [];

app.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

io.on('connection', function (socket) {
    socket.on('typing', function (msg) {
        console.log(msg.nickname + ' is typing...');
        io.emit('typing', msg);
    });

    socket.on('connected', function () {
        console.log('A user connected.');
        io.emit('connected', 'A user connected.');
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected.');
        io.emit('disconnect', 'A user disconnected.');
    });

    socket.on('chat-message', function (msg) {
        console.log('Message: ' + msg.message);
        io.emit('chat-message', msg);
    });
});
