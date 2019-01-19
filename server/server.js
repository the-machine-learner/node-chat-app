const path = require('path');
const express = require('express');
const socketIO = require('socket.io');   //establishes connection both ways between client and server
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const app = express();

const port = process.env.PORT||3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection',function(socket){
	console.log('new user connected');

 //emit is used for emmmiting events 1st arg is event name and seconf=d is data
	
	socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
	socket.emit('newMessage',generateMessage('Admin','Welcome new user'));

	socket.on('createMessage',function(mess,callback){
		console.log('createMessage',mess);
		io.emit('newMessage',generateMessage(mess.from,mess.text));
		callback();
		// socket.broadcast.emit('newMessage',{
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });

	});
	socket.on('createLocationMessage',(coords)=>{
		                                 
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
	});
	socket.on('disconnect',function(){
		console.log('Disconnected from sever');
		});
});

server.listen(port,()=>{
	console.log(`Started new server at ${port}`);
});

module.exports = {app};

//emmitted from front end caught at backend
//emmitted from backend end caught at fronted