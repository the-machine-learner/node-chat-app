	var socket = io();
	socket.on('connect',function(){
		console.log('connected to server');
		
		socket.emit('createMessage',{
			to: 'user@gc',
			text: 'reply'
		});
	});
	socket.on('disconnect',function(){
		console.log('Disconnected from sever');
	});	
	socket.on('newMessage',function(Message){
		console.log('new Message',Message);
	});
