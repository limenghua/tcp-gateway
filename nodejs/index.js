const net = require('net');
const gateway = require('./tcp-gateway');
const echo = require('./echo-server');

const LOCAL_PORT = 9098;

const REMOTE_ADDR = '127.0.0.1';
const REMOTE_PORT = 9099;

echo.createServer(REMOTE_PORT);
gateway.createServer(LOCAL_PORT,REMOTE_ADDR,REMOTE_PORT);