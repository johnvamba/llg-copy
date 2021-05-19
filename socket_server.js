var app = require('express')();
var http = require('http').createServer(app);
const cors = require('cors');
var io = require('socket.io')(http, {
    cors:true,
 	origins:["http://neuma.test"],
});


app.get('/', function (req, res) {
    res.send('Neuma web socket!');
});



io.on('connection', function (socket) {
    socket.on("success donation", function (data) {
        console.log("success donation!")
        socket.emit('donation', data)
    });
    socket.on("*", function(data) {
    	socket.emit('something', data)
    })
});

http.listen(5000, '127.0.0.1', function() {
    console.log(`listening on http://127.0.0.1:5000`);
});