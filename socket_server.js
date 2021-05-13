var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});

app.get('/', function (req, res) {
    res.send('Neuma web socket!');
});

io.on('connection', function (socket) {
    socket.on("success donation", function (data) {
        console.log("success donation!")
        socket.emit('donation', data)
    });
});

http.listen(5000, '192.168.1.2', function() {
    console.log(`listening on http://192.168.1.2:5000`);
});