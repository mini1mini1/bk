$(document).ready(function(){	
	$('#msg').hide();
	var socket = io();
	
	$('form').submit(function(){
		console.log('chat from client');
		console.log('LatLng: '+marker_msg.getLatLng());
		socket.emit('chat message',
				{
		    username: "",
		    socketId: "",
		    content: $('#m').val(),
		    LatLng:marker_msg.getLatLng()
		   });
				
				
		$('#m').val('');
		$('#m').focus();
		return false;
	});
	
	socket.on('chat message', function(data_list){
		
		map.eachLayer(function(layer) {
		    if(layer.options.pane === "tooltipPane") layer.removeFrom(map);
		});
	
		for (i=0;i<data_list.length;i++) {
			console.log('chat from server: '+ data_list[i].content);
			
			
			map.openTooltip(data_list[i].content,data_list[i].LatLng,{permanent:true})
				
		}
		/*var popup = L.popup()
	    .setLatLng(data_list[i].LatLng)
	    .setContent(data_list[i].content)
	    .openOn(map);*/
		
		//$('#messages').append($('<li>').text(msg));
		//window.scrollTo(0, document.body.scrollHeight);
	});
});