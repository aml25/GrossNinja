/*login-server.js*/

/*** ALL THE REQUIRES ***/
var fs = require('fs');
var http = require('http');
var express = require('express');
var app = module.exports.app = express();
var server = http.createServer(app); //the server, serving the files to clients
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var url = require("url");
/*** ============================== ***/

//config for username and password
var messages = JSON.parse(fs.readFileSync("wall.json"));

//set up headers for the server (not sure if this is really needed)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//extend Express for JSON
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//serve a folder called "public," which contains all the data to be served to clients
app.use(express.static(__dirname + '/public'));

/***do stuff here***/

var wallID; //this is the users current wall

io.on('connection', function (socket) {

	socket.on('newMessage', function (data) {
		
		data.id = Math.round((Math.random() * Math.random() * Math.random()) * 100000000); //set some unique id

		console.log(data);

		if(wallID == "false"){
			messages.messages.push(data);
		}
		else{
			messages.walls[wallID].messages.push(data);
		}

		fs.writeFile("wall.json", JSON.stringify(messages, null, '\t')); //save the users data, there's definitely a better way to do this
		console.log("just wrote to the file");

		io.sockets.emit('createdMessage', data);
	});
});

app.post("/getMessages", function(req, res){
	wallID = req.body.id;
	if(messages.walls.hasOwnProperty(wallID)){
		res.send(messages.walls[wallID].messages);
	}
	else if(wallID == "false"){
		res.send(messages.messages);
	}
	else{
		messages.walls[wallID] = {};
		messages.walls[wallID]['messages'] = [];

		fs.writeFile("wall.json", JSON.stringify(messages, null, '\t')); //save the users data, there's definitely a better way to do this
		console.log("just wrote to the file");

		res.send(messages.walls[wallID].messages);
	}
	
	
});

/*app.post("/newMessage", function(req, res){
	//console.log(req.body);
	messages.messages.push(req.body);

	//console.log(messages);

	fs.writeFile("wall.json", JSON.stringify(messages, null, '\t')); //save the users data, there's definitely a better way to do this
	res.send(req.body);
});*/

//every second loop through messages and start to kill them
/*setInterval(function(){
	var deadMessages = [];
	for(var i=0;i<messages.messages.length;i++){
		messages.messages[i].timetodie -= 1000;
		if(messages.messages[i].timetodie <= 0){
			deadMessages.push(messages.messages[i].id);
			messages.messages.splice(i,1);
		}
	}
	if(deadMessages.length > 0){
		console.log("removing a message and saving the file");
		fs.writeFile("wall.json", JSON.stringify(messages, null, '\t')); //save the users data, there's definitely a better way to do this
		io.sockets.emit('removeMessages', deadMessages);
	}
}, 1000);*/

/*******************/

/*** FINALLY, START LISTENING ON THE SERVER ***/
server.listen(8999,  function(){
    console.log(server.address());
});