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
	
	// socket.emit('createMessage',{
	// 	from: 'user@gc',
	// 	text: 'bullshit'
	// }, function(response){
	// 	console.log(response);
	// });

  
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

	


// socket.emit VS io.emmit - io emmits to every single listner 
//while socket emmits to a single listner 