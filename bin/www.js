const app = require('../app');
const http = require('http');
const port = normalizePort(process.env.PORT || '3000');
app.set('port',port);

// Ccreate HTTP Server.
const server = http.createServer(app);

app.io.attach(server);

server.listen(port,function () {});
  server.on('error',onError);
  server.on('listening',onListening);

// Normallize a port into a number, string, or false.

function normalizePort(val) {
  var port = parseInt(val,10);

  if(isNaN(port)){
    // named pipe
    return val;
  }

  if(port >= 0){
    // port number
    return port;
  }

  return false;
}

// Event listener for HTTP server "error" event.

function onError(err) {
  if(error.syscall !== 'listen'){
    throw err;
  }

  var bind = typeof port === 'string' ? 'Pipe' +port : 'Port' +port;

  // handle specific listen errors with friendly messages
  switch(err.code){
    case 'EACCES' :
      console.log(bind + ' requires elevated privilages');
      process.exit(1);
      break;
    case 'EADDINUSE' :
      console.log(bind + ' is already in use');
      process.exit(1);
      break
  }
}

// Event listener for HTTP server "listening" event.

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + addr.port;

}
