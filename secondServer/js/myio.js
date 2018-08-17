$(function () {
	var socket = io();
	
	$('form').submit(function(){
		console.log('chat from client');
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});
	
	socket.on('chat message', function(msg){
		console.log('chat from server: '+msg);
		//$('#messages').append($('<li>').text(msg));
		//window.scrollTo(0, document.body.scrollHeight);
	});
});