
var express = require('express');
var router = express.Router();
var fs = require('fs');  
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true })); //extract the body part (personal understanding)

//var availability = require('./availability');


// CREATES A NEW ENTRY
router.post('/', function (req, res) {	// use /api ?
	
	var r = require('rethinkdbdash')({
			host: 'rethinkdbsimon.southcentralus.cloudapp.azure.com',
			port: 28015,
			db: 'SimonDB',
			buffer: 10,
			max: 100,
			timeoutGb: 60 * 60 * 1000
		}, function(err,connection) {
		callback(err,connection);
	});
	
	r.table("availabilities").insert({
			lot_id: req.body.lot_id,
			status: req.body.status
		}).run().then(function(response){
			console.log('Success ',response);
			res.status(200).send(response);
		})
		.error(function(err){
			console.log('error occurred ',err);
		})

	//MONGODB
    /*availability.create({
			lot_id: req.body.lot_id,
            status: req.body.status
        }, 
        function (err, availability) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(availability);
        });*/
});

// GETS ALL THE ENTRIES IN THE DATABASE
router.get('/', function (req, res) {
	
	var r = require('rethinkdbdash')({
			host: 'rethinkdbsimon.southcentralus.cloudapp.azure.com',
			port: 28015,
			db: 'SimonDB',
			buffer: 10,
			max: 100,
			timeoutGb: 60 * 60 * 1000
		}, function(err,connection) {
		callback(err,connection);
	});
	
	r.table("availabilities").run().then(function(response){
			console.log(response);
			res.status(200).send(response);
		})
		.error(function(err){
			console.log(err);
		})
	
	
	//MONGODB
    /*availability.find({}, function (err, availabilities) {
        if (err) return res.status(500).send("There was a problem finding the infos.");
        res.status(200).send(availabilities);
		//res.json(availability);
    });*/
	
});

// GETS A SINGLE ENTRY FROM THE DATABASE
router.get('/:id', function (req, res) {

	var r = require('rethinkdbdash')({
			host: 'rethinkdbsimon.southcentralus.cloudapp.azure.com',
			port: 28015,
			db: 'SimonDB',
			buffer: 10,
			max: 100,
			timeoutGb: 60 * 60 * 1000
		}, function(err,connection) {
		callback(err,connection);
	});
	
	r.table("availabilities").get(req.params.id).run().then(function(response){
		console.log(response);
		res.status(200).send(response);
	})
	.error(function(err){
		console.log(err);
	})
	
	
    /*availability.findById(req.params.id, function (err, availability) {
        if (err) return res.status(500).send("There was a problem finding the info.");
        if (!availability) return res.status(404).send("No info found.");
        res.status(200).send(availability);
		//res.json(availability);
    });*/
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
	
	var r = require('rethinkdbdash')({
			host: 'rethinkdbsimon.southcentralus.cloudapp.azure.com',
			port: 28015,
			db: 'SimonDB',
			buffer: 10,
			max: 100,
			timeoutGb: 60 * 60 * 1000
		}, function(err,connection) {
		callback(err,connection);
	});
	
	r.table("availabilities").get(req.params.id).delete().run().then(function(response){
			console.log(response);
			res.status(200).send(response);
		})
		.error(function(err){
			console.log(err);
		})
	
    /*availability.findByIdAndRemove(req.params.id, function (err, availability) {
        if (err) return res.status(500).send("There was a problem deleting the entry.");
        res.status(200).send("Entry "+ availability._id +" was deleted.");
    });*/
	
});

// UPDATES A SINGLE ENTRY IN THE DATABASE
router.put('/:id', function (req, res) {

	var r = require('rethinkdbdash')({
			host: 'rethinkdbsimon.southcentralus.cloudapp.azure.com',
			port: 28015,
			db: 'SimonDB',
			buffer: 10,
			max: 100,
			timeoutGb: 60 * 60 * 1000
		}, function(err,connection) {
		callback(err,connection);
	});
	
	//Only field "status" will be updated here
	r.table("availabilities").get(req.params.id).update({status: req.body.status}).run().then(function(response){
			console.log(response);
			res.status(200).send(response);
		})
		.error(function(err){
			console.log(err);
		})
    
	// req.params.id can be replaced by {status: off} (Example)
   /* availability.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, availability) {
        if (err) return res.status(500).send("There was a problem updating the availability.");
        res.status(200).send(availability);
    });*/
});

module.exports = router;