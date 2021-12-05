const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

// Game status is stored here
// Change as needed
var game_status = {
    map: [],
    players: [],
    events: []
};

// All the http requests are handled here
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/' + req.path);
});

// Event based updating
io.on('connection', (socket) => {
    // Event from client 
    socket.on('update', data => {
        // Update logic goes here
        // TODO: make sure only relevant player data is updated
        //       in order to avoid race condition
        console.log("hey");
        game_status = data;
        // Broadcast update to everyone
        io.emit('update', game_status);
        /* In order to respond to this client
        socket.emit() should used instead
        */
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});