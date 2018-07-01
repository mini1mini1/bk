var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var time_server_start = new Date().getTime();
 
// Initialize appication with route / (that means root of the application)
app.use('/', express.static(__dirname));
app.get('/', function(req, res){		  
	  res.sendFile('index.html');
	});
 
// Register events on socket connection
io.on('connection', function(socket){ 
	socket.on('disconnect', function(){	    
		
		    for (var i = 0; i < data_s.length; i++){		    	
		    	if (data_s[i].socketId && data_s[i].socketId === socket.id) { 
			        data_s.splice(i,1);
			        io.emit('chatMessage', data_s);			        
			        break;			        
			    }
		    	
		    };	    
		    
	  });
	
	socket.on('connected', function(data){	
		
		io.emit('connected', socket.id, data_s);
				
		
	});
		
	
  socket.on('chatMessage', function(data){
	  data_s = data;
	  
	  io.emit('chatMessage', data_s);
	  
	      
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
  
});
 

// Listen application request on port 3000 hey
http.listen(8080, function(){
  console.log('listening on *:8080');

});

function makeid() {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	 
	  for( var i=0; i < 5; i++ ) {
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
	  }
	  return text;
	}