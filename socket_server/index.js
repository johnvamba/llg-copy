var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on("connection", function (socket) {

    socket.on("success donation", function (data) {
        socket.emit('donation', data)
    });

});

http.listen(5000, function () {
    console.log(`http://neuma-web.test:5000`);
});
