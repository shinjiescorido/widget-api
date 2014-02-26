'use strict';

var learningTargetsList = 'learningTargets';
var ObjectID = require('mongodb').ObjectID;

exports.findAll = function( req, res ) {
	db.collection( learningTargetsList, function ( err, collection ) {
		collection.find().toArray( function ( err, items ) {
			res.send( items );
			console.log( 'Fetching groups' );
		} );
	} );
};


//curl -d "content=<a href = \"#\">Ann Perkins</a> shared a video with you&type=video&url=#&imgIcon=http://builtbyhq.com/projects/sinet/img/green-play.png" http://localhost:3001/groupactivity

//curl -d "content=<a href=\"\">Ogden School District</a> invited you to join&type=group&url=#&imgIcon=http://builtbyhq.com/projects/sinet/img/green-group.png" http://localhost:3001/groupactivity

//curl -d "content=<a href=\"\">Ron Swanson</a> shared a lesson plan with you&type=file&url=#&imgIcon=http://builtbyhq.com/projects/sinet/img/green-file.png" http://localhost:3001/groupactivity

//curl -d "content=<a href = \"#\">Ann Perkins</a> shared a video with you&type=video&url=#&imgIcon=http://builtbyhq.com/projects/sinet/img/green-play.png" http://localhost:3001/groupactivity

//curl -d "content=<a href = \"#\">Ann Perkins</a> shared a video with you&type=video&url=#&imgIcon=http://builtbyhq.com/projects/sinet/img/green-play.png" http://localhost:3001/groupactivity

exports.addActivity = function ( req, res) {
	var activities = [
		{
			content : req.body.content,
			date    : new Date(),
			type    : req.body.type,
			url     : req.body.url,
			imgIcon : req.body.imgIcon
		}
	];
	db.collection( learningTargetsList, function ( err, collection ) {
		collection.insert( activities, { safe: true }, function ( err, doc ) {
			if ( err ) {
				console.log( err );
				res.send( 404, err );
			} else {
				res.send( 200, doc );
			}
		} );
	} );
};

//curl -X DELETE 'http://localhost:3001/groupactivity/'
exports.deleteActivity = function ( req, res ) {
	db.collection( learningTargetsList, function ( err, collection ) {
		var id = req.params.id;

		collection.remove( { _id: new ObjectID( id ) }, 1, function ( err, doc ) {
			if ( err ) {
				console.log( err );
				res.send( 404, err );
			} else {
				console.log( doc );
				console.log( id );
				res.send( 200, doc );
			}
		} );
	} );
};

exports.deleteAll = function ( req, res ) {
	db.collection( learningTargetsList, function ( err, collection ) {

		collection.remove( function ( err, doc ) {
			if ( err ) {
				res.send( 404, err );
			} else {
				res.send( 200, doc );
			}
		} );
	} );
};

exports.populateDB = function ( req, res ) {
	var targets = [
		{
			'content'    : 'Using Non-Linguistic Representations',
			'url'        : '#',
			'inProgress' : true,
			'completion' : 33,
			'date'       : '2014-02-17T06:26:57.036Z'
		},
		{
			'content'    : 'Summarizing and Note Taking',
			'url'        : '#',
			'inProgress' : true,
			'completion' : 78,
			'date'       : '2014-02-17T06:27:05.062Z'
		},
		{
			'content'    : 'Stage Thirty Seven: Prompt Student And Teacher Repsonse',
			'url'        : '#',
			'inProgress' : false,
			'completion' : 0,
			'date'       : '2014-02-17T06:27:59.746Z'
		}
	];

	db.collection( learningTargetsList, function ( err, collection ) {
		collection.insert( targets, { safe: true }, function ( err, result ) {
		if ( err ) {
				console.log( err );
				res.send( 404, err );
			} else {
				console.log( result );
				res.send( 200, result );
			}
		} );
	} );
};
