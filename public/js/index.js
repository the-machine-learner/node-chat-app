	var socket = io();
	socket.on('connect',function(){
		console.log('new user connected');

		// socket.emit('createMessage',{
		// 	to: 'user@gc',
		// 	text: 'reply'
		// });
	});
	socket.on('disconnect',function(){
		console.log('Disconnected from sever');
	});	
	socket.on('newMessage',function(Message){
		console.log('new Message',Message);
	});

// socket.emit VS io.emmit - io emmits to every single listner 
//while socket emmits to a single listner 