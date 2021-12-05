const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

var game_status = {
    map: "",
    players: "",
    events: ""
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/' + req.path);
});

io.on('connection', (socket) => {
    socket.on('update', data => {
    console.log("hey");
    game_status = data;
    io.emit('update', game_status);
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});