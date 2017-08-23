const net = require('net');

const LOCAL_PORT = 9098;

const server = net.createServer();
server.listen(LOCAL_PORT);

server.on('connection',(socket)=>{
    console.log('new connect on',socket.remoteAddress,":",socket.remotePort);
    socket.on('data',(data)=>{
        socket.write(data);
    });
    socket.on('close',()=>{
        console.log('connect closed');
    });
    socket.on('error',()=>{
        console.log('connect error');
    });
});