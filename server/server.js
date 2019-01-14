const path = require('path');
const publicPath = path.join(__dirname,'../public');

const express = require('express');

const app = express();

PORT = 3000;

app.get('/',(req,res)=>{
	res.sendFile('index.html',{root:publicPath});
});

app.listen(PORT,()=>{
	console.log(`Started new server at ${PORT}`);
});

module.exports = {app};