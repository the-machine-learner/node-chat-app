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
	locationButton.attr("disabled",true).text('Sending Location...');
	var li = jQuery('<li></li>');
	li.text("User is sending location");
	jQuery('#messages').append(li);	
	if(!navigator.geolocation){

		alert('Geolocation not supported By your browser');
		locationButton.attr('disabled',false).text('Send Location');
		li.remove();
		return;
	}

	navigator.geolocation.getCurrentPosition(function(position){
		console.log('here');
		socket.emit('createLocationMessage',{
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	},function(e){		
		alert('Unable to fetch location');
		locationButton.attr('disabled',false).text('Send Location');
		li.remove();
	});
});
  
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
if(jQuery('[name=message]').val()!='')
	{
	  var messageBox = jQuery('[name=message');

	  socket.emit('createMessage', {
	    from: 'User',
	    text: messageBox.val()
	  }, function () {
	  	messageBox.val('');
	  });
	}
});

socket.on('newLocationMessage',function(message){
	console.log(message);

	var a = jQuery('<a target="_blank">My current location</a>');
	var li = jQuery("ol li:last");
	li.text(`${message.from}: `);
	a.attr('href',message.url);
	li.append(a);
	locationButton.attr('disabled',false).text('Send Location');
});	


// socket.emit VS io.emmit - io emmits to every single listner 
//while socket emmits to a single listner 