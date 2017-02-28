const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


var TCP = require('./tcpServer');
//const test = require('./routes/test');

var socket;

const app = express();

app.io = require('socket.io')();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function (req,res) {
  res.render('test');
})


TCP.on('data',function (strData) {
  app.io.emit('recieveData',strData);
})
TCP.on('socket',function (client) {
  console.log("socket on ");
  socket = client;
})


app.io.on('connection',function (socket2) {
  socket2.on('senddata',function (msg) {
    writeData(socket,msg);
  })
})

// TCP 쓰기 함수
function writeData(client,data) {
  var success = !client.write(data);
  if(!success){
    (function (client,data) {
      client.once('drain',function () {
        writeData(client,data);
      });
    })(client,data);
  }
  app.io.emit('senddata2',data);
}


module.exports = app;
