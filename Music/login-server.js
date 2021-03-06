/*login-server.js*/

/*** ALL THE REQUIRES ***/
var fs = require('fs');
var http = require('http');
var express = require('express');
var app = module.exports.app = express();
var server = http.createServer(app); //the server, serving the files to clients
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
/*** ============================== ***/

//config for username and password
var users = JSON.parse(fs.readFileSync("../../Documents/gross_ninja_users.json"));

//set up headers for the server (not sure if this is really needed)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());

//serve a folder called "public," which contains all the data to be served to clients
app.use(express.static(__dirname + '/public'));

app.post('/login', function(req, res){
	var loggedIn = false;

	for(var i in users.users){
		console.log("checking if: " + req.body.email + " == " + users.users[i].email);
		if(req.body.email == users.users[i].email && req.body.password == users.users[i].password){
			console.log(req.body.email + " has logged in successfully");

			//set the user to logged in
			users.users[i].lastLoggedIn = new Date(Date.now()).getTime();
			users.users[i].randomNumber = Math.random();
			fs.writeFile("../../Documents/gross_ninja_users.json", JSON.stringify(users, null, '\t')); //save the users data, there's definitely a better way to do this

			res.setHeader('Set-Cookie', ["email="+users.users[i].email, "randomNumber="+users.users[i].randomNumber]);

			res.send({"status": true});
			loggedIn = true;
			break;
		}
	}

	if(!loggedIn){
		res.send({"status": false});
	}
});

app.post('/checkLogin', function(req, res){
	var loginMatch = false;
	console.log("checking if: " + req.body.email + " and " + req.body.randomNumber + " match...");
	for(var i in users.users){
		if(req.body.email == users.users[i].email && req.body.randomNumber == users.users[i].randomNumber){
			res.send({"status": true});
			loginMatch = true;
			break;
		};
	}

	if(!loginMatch){
		res.send({"status": false});
	}
});

app.get("/something", function(req, res){
	console.log("shit yeah!");
})

/*** FINALLY, START LISTENING ON THE SERVER ***/
server.listen(7777,  function(){
    console.log(server.address());
});