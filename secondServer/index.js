var fs = require("fs");
var http = require
var express = require('express');
var app = express();
var https = require('https');
//var http = require('http').Server(app);
//var io = require('socket.io')(http);

var credentials = {
		  ca: fs.readFileSync('certs/maptok_com.ca-bundle'),
		  key: fs.readFileSync('certs/maptok_com.key'),
		  cert: fs.readFileSync('certs/maptok_com.crt'),
		};


var server= https.createServer(credentials, app);

server.listen(app.get('8000'), function() {
    console.log('Server up on port ' + app.get('8000'));
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/w3.html');
});

app.get('/test', function(req, res){
	  res.sendFile(__dirname + '/index.html');
	});

app.use('/', express.static(__dirname + '/'));

/*io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(data){
	console.log('from client:'+data.message);
    io.emit('chat message', data);
  });
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});*/
