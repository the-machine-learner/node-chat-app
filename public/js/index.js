	var socket = io();

	function scrollToBottom(){
		var messages = jQuery('#messages');
		var newMessage = messages.children('li:last-child');

		var clientHeight = messages.prop('clientHeight');
		var scrollTop = messages.prop('scrollTop');
		var scrollHeight = messages.prop('scrollHeight');
		var newMessageHeight = newMessage.innerHeight();
		var lastMessageHeight = newMessage.prev().innerHeight();
		if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
			messages.scrollTop(scrollHeight);
		}
	} 

	socket.on('connect',function(){
		console.log('new user connected');
	});
	socket.on('disconnect',function(){
		console.log('Disconnected from sever');
	});	
	socket.on('newMessage',function(Message){
		var formattedTime = moment(Message.createdAt).format('h:mm a');
		console.log(formattedTime);
		var template = jQuery('#message-template').html();
		var html = Mustache.render(template,{
			text: Message.text,
			from: Message.from,
			createdAt: formattedTime
		});

		jQuery('#messages').append(html);
		scrollToBottom();
		// console.log('new Message',Message);
		// var li = jQuery('<li></li>');
		// li.text(`${Message.from} ${formattedTime}:${Message.text}`);
		// jQuery('#messages').append(li);
	
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
		// console.log('here');
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

	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template,{
		url: message.url,
		from: message.from,
		createdAt: formattedTime
	});	
	// console.log(message);
	// var formattedTime = moment(message.createdAt).format('h:mm A');
	// var a = jQuery('<a target="_blank">My current location</a>');
	// var li = jQuery("ol li:last");
	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href',message.url);
	// li.append(a);
	jQuery('ol li:last').remove();
	jQuery('#messages').append(html);
	locationButton.attr('disabled',false).text('Send Location');
	scrollToBottom(); 
});	


// socket.emit VS io.emmit - io emmits to every single listner 
//while socket emmits to a single listner 