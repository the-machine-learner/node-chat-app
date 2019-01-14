const path = require('path');
const express = require('express');
const socketIO = require('socket.io');   //establishes connection both ways between client and server
const http = require('http');

const publicPath = path.join(__dirname,'../public');

const app = express();

const port = process.env.PORT||3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection',function(socket){
	console.log('new user connected');

 //emit is used for emmmiting events 1st arg is event name and seconf=d is data
	
	socket.emit('newMessage',{
		from: 'user101',
		text: 'abcd',
		createdAt: 435
	});

	socket.on('createMessage',function(Message){
			console.log('createMessage',Message)
	});
	socket.on('disconnects',function(){
		console.log('Disconnected from sever');
		});
});

server.listen(port,()=>{
	console.log(`Started new server at ${port}`);
});

module.exports = {app};