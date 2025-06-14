var app = require('express')();
var http = require('http').createServer(app);
const cors = require('cors');
var io = require('socket.io')(http, {
	cors: true,
	origins:['http://neuma.test', 'http://127.0.0.1', 'https://dev.lovelivesgenerously.demosite.ninja', 'https://dev.lovelivesgenerously.demosite.ninja:4443', 'https://admin.neuma.church', 'https://admin.neuma.church:4443'],
	// origins: ['http://neuma-web.test', 'http://neuma-web.test:4443'], // for local testing
});


app.get('/', function (req, res) {
	res.send('Neuma web socket!');
});

io.on('connection', function (socket) {
	socket.on("success_donation", (data) => {
		console.log("success donation!", data)
		socket.emit('donation', data);
	});

	socket.on("close_payment_screen", (data) => {
		console.log("closing payment screen..")
		socket.emit('close_payment', data);
	});

	socket.on("group_message", (data) => {
		console.log("broadcasting message...")
		socket.emit('group_message', data)
	});

	// socket.on("*", function (data) {
	// 	socket.emit('something', data)
	// })
});

http.listen(5000, function () {
	console.log(`listening on http://3.25.191.28:5000`, http);

	// console.log(`listening on http://192.168.1.5:5000`, http); // for local testing
});
