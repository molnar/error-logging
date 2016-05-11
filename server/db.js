"use strict";

var Datastore = require('nedb');
var logger = require('nedb-logger');
var dbfile = '../database/error-logs.json';
var db;

exports.initialize = function(onDBInitialized,loggingModeOnly){	
	//when in logging mode, use neeb-logger library, so whole DB is not loaded in memory
	if(!loggingModeOnly){
		// Initialize the Flat File Database
		db = new Datastore({filename: dbfile, autoload: false});

		//report database loaded
		db.loadDatabase(function (err){
				onDBInitialized =  onDBInitialized || function () {};
				onDBInitialized(err,db);
		})

		//Apply Index
		db.ensureIndex({})
	}
	else{
		db = new Logger({filename: dbfile});
		console.log("Database Initialized In Logging Mode Successfully");
		onDBInitialized = onDBInitialized || function () {};
		onDBInitialized(null,db);
	}
}

exports.getDatabase = function() {
	return db;
}
