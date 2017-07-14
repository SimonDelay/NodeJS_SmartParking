
var express = require('express');						// call express
var app = express();									// define our app using express
//var db = require('./db');
//var db = require('./dbRethinkDB');


/**
  Adding the controllers.
*/
//var dbModel = new db();
/**
  Connecting to dB
*/
//dbModel.connectToRethinkDbServer();


//var controller = require('./controller');
var controller = require('./controllerAzure');
app.use('/availabilities', controller); // the "/" route within controller.js is linked to /availabilities

module.exports = app;