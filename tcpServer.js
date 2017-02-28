const net = require('net');
const EventEmitter = require('events');
EventEmitter.EventEmitter.prototype._maxListeners = 99999;
module.exports = new EventEmitter();
const tcpPort = 5000;

const tcpServer = net.createServer();


tcpServer.on('connection',handleConnection);

function handleConnection(client) {
  module.exports.emit('socket',client);
  var remoteAddress = client.remoteAddress + ':' +client.remotePort;
  console.log('new Client connection from %s',remoteAddress);
  client.on('error',clientError);
  client.once('close',clientClose);
  client.on('data',clientData);

  function clientError(err) {
    console.log('Connection %s error: %s',remoteAddress,err.message);
  }
  function clientClose() {
    console.log('connection from %s closed ',remoteAddress);
  }
  function clientData(data) {
    strdata = data.toString();
    module.exports.emit('data',strdata);
    console.log('Client data from %s : %s',remoteAddress,data);
  }

};

tcpServer.listen(tcpPort,()=>{
  console.log("server listeing to %j",tcpServer.address());
});
