const net = require('net');

const LOCAL_PORT = 9099;

const REMOTE_ADDR = '127.0.0.1';
const REMOTE_PORT = 9098;

const server = net.createServer();
server.listen(LOCAL_PORT);

server.on('connection',handleConnection);

function handleConnection(socket){
    let client = new net.Socket();
    client.connect(REMOTE_PORT,REMOTE_ADDR,function(){
        pipeSocket(socket,client);
    });
    client.on('error',()=>{
        socket.end();
    });
}

function pipeSocket(socketIn,socketOut){
    socketIn.pipe(socketOut);
    socketOut.pipe(socketIn);

    socketIn.on('close',()=>{
        if(!socketOut.destroyed){
            socketOut.end();
        }
    });
    socketOut.on('close',()=>{
        if(!socketIn.destroyed){
            socketIn.end();
        }  
    });
}
