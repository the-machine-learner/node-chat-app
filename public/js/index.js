	var socket = io();
	socket.on('connect',function(){
		console.log('new user connected');
	});
	socket.on('disconnect',function(){
		console.log('Disconnected from sever');
	});	
	socket.on('newMessage',function(Message){
		console.log('new Message',Message);
		var li = jQuery('<li></li>');
		li.text(`${Message.from}:${Message.text}`);
		jQuery('#messages').append(li);
	});

	// 	socket.emit('createMessage',{
	// 	from: 'user@gc',
	// 	text: 'bullshit'
	// }, function(response){
	// 	console.log(response);
	// });

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){

	if(!navigator.geolocation){
		return alert('Geolocation not supported By your browser');
	}

	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	},function(e){
		alert('Unable to fetch location');
	});
});
  
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
if(jQuery('[name=message]').val()!='')
	{
	  socket.emit('createMessage', {
	    from: 'User',
	    text: jQuery('[name=message]').val()
	  }, function () {

	  });
	}
});

socket.on('newLocationMessage',function(message){
	console.log(message);
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');
	li.text(`${message.from}: `);
	a.attr('href',message.url);
	li.append(a);
	jQuery('#messages').append(li);
});	

// socket.emit VS io.emmit - io emmits to every single listner 
//while socket emmits to a single listner 