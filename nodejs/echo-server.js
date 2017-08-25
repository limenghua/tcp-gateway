const net = require('net');

function createServer(port) {
    const server = net.createServer();
    server.listen(port);

    server.on('connection', (socket) => {
        socket.pipe(socket);
    });
}

exports.createServer = createServer;