var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);




app.get('/', function(req, res){
  res.sendFile(__dirname + '/w3.html');
});

app.use('/', express.static(__dirname + '/src'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(data){
	console.log('from client:'+data.message);
    io.emit('chat message', data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
