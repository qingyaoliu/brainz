const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);


//Server auf port 3000
server.listen(3000);


/*
 Die Dateien werden aus den jeweiligen Verzeichnissen statisch geladen
 */
app.use(express.static(__dirname + '/public'));
app.use('/design', express.static(__dirname + '/design'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/javascript', express.static(__dirname + '/javascript'));


/*
 So wird die home.html Datei beim Zugriff auf den Server (http://127.0.0.1:3000/) ausgegeben
 */

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/home.html');
});

/*
 Websockets
 */
io.on('connection', (socket) => {
    var addedUsername = false;
    socket.on('add user', (username) => {
        if (addedUsername) return;

// Username wird in der Socket Session vermerkt
        socket.username = username;
        addUsername = true;
        io.emit('user accede', {
            username: socket.username
        });
        console.log('User: ' + socket.username);
    });

    socket.on('new message', (data) => {
        io.emit('new message', {
            username: socket.username,
            message: data
        });
        console.log('Message:' + data);
    });
});

console.log('Der Server läuft nun unter http://127.0.0.1: 3000');