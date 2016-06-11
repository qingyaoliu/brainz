const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server);

/* Express wird dazu angewiesen, die Dateien, die sich im Ordner public befinden,
   bei Anfrage an den Besucher zu laden
*/

server.listen(3000);


//statische Dateien ausliefern
app.use(express.static(__dirname + '/public'));
app.use('/design', express.static(__dirname + '/design'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/javascript', express.static(__dirname + '/javascript'));
app.use('/socket.io-client', express.static(__dirname + '../node_modules/socket.io-client'));


app.get('/', function (req, res) {
	// so wird die Datei index.html ausgegeben
	res.sendfile(__dirname + '/public/chat.html');
});


//Websockets
io.sockets.on('connection', function (socket) {
	// der Client ist verbunden
	socket.emit('chat', { zeit: new Date(), text: 'Du bist nun mit dem Server verbunden!' });
	// wenn ein Benutzer einen Text sendet
	socket.on('chat', function (data) {
		// so wird dieser Text an alle anderen Benutzer gesendet
		io.sockets.emit('chat', { zeit: new Date(), name: data.name || 'Anonym', text: data.text });
	});
});

console.log('Der Server läuft nun unter http://127.0.0.1: 3000');