var fs = require("fs");
var http = require("http");
var https = require('https');
var express = require('express');
var app = express();

//var http = require('http').Server(app);

var credentials = {
		  ca: fs.readFileSync('certs2/maptok_com.ca-bundle'),
		  key: fs.readFileSync('certs2/maptok_com.key'),
		  cert: fs.readFileSync('certs2/maptok_com.crt'),
		};


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

var io = require('socket.io')(httpServer);

app.get('/', function(req, res){
	  res.sendFile(__dirname + '/w3.html');
	});

	app.get('/test', function(req, res){
		  res.sendFile(__dirname + '/index.html');
		});

	app.use('/', express.static(__dirname + '/'));

httpServer.listen(8080);
httpsServer.listen(8000);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(data){
	console.log('from client:'+data.message);
    io.emit('chat message', data);
  });
});

/*http.listen(8000, function(){
  console.log('listening on *:8000');
});*/
