var fs = require("fs");
//var http = require("http");
var https = require('https');
var express = require('express');
var app = express();

//var http = require('http').Server(app);

var credentials = {
    ca: fs.readFileSync('certs2/maptok_com.ca-bundle'),
    key: fs.readFileSync('certs2/maptok_com.key'),
    cert: fs.readFileSync('certs2/maptok_com.crt'),
};

var data_list = [];

//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//var io = require('socket.io')(httpServer);
var io = require('socket.io')(httpsServer);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/w3.html');
});

app.get('/test', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.use('/', express.static(__dirname + '/'));

//httpServer.listen(8080);
httpsServer.listen(8000, function(){
  console.log('listening on *:8000');
});

io.on('connection', function(socket){
  console.log('New connection from ' + socket.handshake.address+', socket id: '+socket.id);
  if(data_list.length>0){
	  socket.emit('chat message', data_list);
  };
  socket.on('chat message', function(data){
	    console.log('data: '+data);
	    for (var i = 0; i < data_list.length; i++){
		    
	    	if (data_list[i].socketId && data_list[i].socketId === socket.id) { 
		        data_list.splice(i,1);		        
		        break;
		    }
	    };
		console.log('from client:'+data.content+', socket id: '+socket.id);
		data_list.push({username: "", socketId:socket.id, content:data.content, LatLng:data.LatLng});
		console.log(data_list);
	    io.emit('chat message', data_list);
  });
  
  socket.on('disconnect', function(){
	    for (var i = 0; i < data_list.length; i++){
		    
	    	if (data_list[i].socketId && data_list[i].socketId === socket.id) { 
		        data_list.splice(i,1);		        
		        break;
		    }
	    };
	    io.emit('chat message', data_list);
        console.log('user disconnected');
  });

});

/*http.listen(8000, function(){
  console.log('listening on *:8000');
});*/
