const should = require('should');
const net = require('net');
const echoServer = require('../echo-server');
const tcpGateway = require('../tcp-gateway');

echoServer.createServer(8080);
tcpGateway.createServer(8081,'127.0.0.1',8080);

describe('the tcp gateway can dipatch data between on tcp server and tcp client',function(){
    
    it('echo server shoud work on port 8080',function(done){
        const client = new net.Socket();
        client.connect(8080,'127.0.0.1',function(){
            client.write('hello world');

            client.on('data',function(data){
                data.toString().should.exactly('hello world');
                done();
            });        
        });
    });

    it('echo server should proxyed by gateway on port 80',function(done){
        const client = new net.Socket();
        client.connect(8081,'127.0.0.1',function(){
            client.write('hello world');

            client.on('data',function(data){
                data.toString().should.exactly('hello world');
                done();
            });        
        });

    });

});