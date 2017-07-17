

var express =require('express');
var app = express();
var port=process.env.PORT || 3000;
var app = require('./app');

app.use(express.static(__dirname + '/public'));


app.get('/',function(req,res){
console.log('hello from server');
 res.render('./public/index.html');
});


// server.js - source: https://hackernoon.com/restful-api-design-with-node-js-26ccf66eab09

/*var express =require('express');
var fs = require('fs'); 
var app = require('./app');
var port=process.env.PORT || 3000;

app.use(express.static(__dirname + '/views'));

// Loading the index file . html displayed to the client
app.get('/', function(req, res) {
	//res.sendFile(__dirname + '/views/indexejs.html');
    //res.render('index.ejs');
	res.render('./views/index.html');
});*/

// Loading socket.io
var server = require('http').Server(app);
var io = require('socket.io').listen(server);


/*var r = require('rethinkdbdash')({
			host: 'rethinkdbsimon.southcentralus.cloudapp.azure.com',
			port: 28015,
			db: 'SimonDB',
			buffer: 10,
			max: 100,
			timeoutGb: 60 * 60 * 1000

});

console.log("Ready");

r.db("SimonDB").table('availabilities').run().then((avails) => {
		console.log("Results:");
		console.log(avails);
	}).error((err) => {
		console.log("Error");
		console.log(err);
	});*/

	
//COULD BE PROBLEM THIS PART WHERE SOCKET AND FEED ARE INTEGRATED
// When a client connects, we note it in the console
/*io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
	
});*/

var r = require('rethinkdbdash')({
			//COMPOSE SERVER
			/*servers: [{
				host: "aws-us-east-1-portal.6.dblayer.com",
				port: 20212
			}],
			"user": "admin",
			"password": "bdcd686d4a80cff4017d934611edea6d",
			db: 'SimonDB',
			buffer: 10,
			max: 100,
			timeoutGb: 60 * 60 * 1000,
			ssl: { rejectUnauthorized: false }*/
			
			//AZURE SERVER
			host: 'rethinkdbsimon.southcentralus.cloudapp.azure.com',
			port: 28015,
			db: 'SimonDB',
			buffer: 10,
			max: 100,
			timeoutGb: 60 * 60 * 1000
	});
	
	r.db("SimonDB").table('availabilities').run().then((avails) => {
		console.log("Results:");
		console.log(avails);
	}).error((err) => {
		console.log("Error");
		console.log(err);
	});
	
	r.table('availabilities').changes().run().then(function(cursor){
		cursor.each(function(err,row) {
            // Log changed data object
            //console.log(JSON.stringify(row, null, 2));
            console.log(row);
            // Emit `new post` event (Socket.io) with data object
            //io.emit('newpost', JSON.stringify(row, null, 2));
            io.emit('newpost', row);
        })
	})
	



	/*r.table('availabilities').changes().run().then(function(cursor){
		cursor.each(console.log(JSON.stringify(result)));
		cursor.each(function(err,row) {
            // Log changed data object
            console.log(JSON.stringify(row, null, 2));
			console.log(row);
            // Emit `new post` event (Socket.io) with data object
            io.emit('newpost', JSON.stringify(row, null, 2));
            //io.emit('newpost', row);
        })
		cursor.toArray().then(function(result) {
			//console.log(JSON.stringify(result))
			io.emit('newpost', JSON.stringify(result));
		});
	})
	.error(function(err){
		console.log(err);
	});*/
	
	
//app.listen(port);
server.listen(port);
console.log('Magic happens on port' + port);

/*
var bodyParser = require('body-parser');				// call body-parser

app.use(bodyParser.urlencoded({ extended: true }));		// configure app to use bodyParser()
app.use(bodyParser.json());								// this will let us get the data from a POST



// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api )

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER (server.js)
// =============================================================================
app.listen(8080);
console.log('Magic happens on port ' + port);


var http = require('http');

var server = http.createServer(function(req, res) {
	
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write('<!DOCTYPE html>'+
	'<html>'+
	' <head>'+
	' <meta charset="utf-8" />'+
	' <title>My Node.js page!</title>'+
	' </head>'+ 
	' <body>'+
	' <p>Here is a paragraph of <strong>HTML</strong>!</p>'+
	' </body>'+
	'</html>');
	res.end();
});

server.listen(8080);*/


/*var	app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);*/