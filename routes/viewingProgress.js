var viewingProgressList = 'viewingProgress';
var ObjectID = require('mongodb').ObjectID;

exports.findAll = function( req, res ) {
	db.collection( viewingProgressList, function ( err, collection ) {
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

//curl -X DELETE 'http://localhost:3001/groupactivity/'
exports.deleteActivity = function ( req, res ) {
	db.collection( viewingProgressList, function ( err, collection ) {
		var id = req.params.id;
		collection.remove( { _id: new ObjectID( id ) }, 1, function ( err, doc ) {
			if ( err ) {
				res.send( 404, err );
			} else {
				res.send( 200, doc );
			}
		} );
	} );
};
exports.addViewingProgress = function ( req, res ) {
	var _title = (req.params.title)?req.params.title:'Sample Content';
	var _completion = (req.params.completion)?req.params.completion:0;
	var _date = (req.params.date)?req.params.date:"2014-01-17T06:26:57.036Z";
	var _activities = [
		{
			"content"      : _title,
			"url"        : "#",
			"inProgress" : true,
			"completion" : _completion,
			"date"       : _date
		}
		];

db.collection( viewingProgressList, function ( err, collection ) {
		collection.insert( _activities, { safe: true }, function( err, result ) {
			if(err){
				console.log(err);
				res.send(404,err);
			}else{
				//console.log(result.toArray);
				res.send(200,result);
			}
		} );
	});
};
exports.addViewingProgressPost = function ( req, res ) {
	var _title = (req.body.title)?req.body.title:'Sample Content';
	var _completion = (req.body.completion)?req.body.completion:0;
	var _date = (req.body.date)?req.body.date:"2014-01-17T06:26:57.036Z";
	var _activities = [
		{
			"content"      : _title,
			"url"        : "#",
			"inProgress" : true,
			"completion" : _completion,
			"date"       : _date
		}
		];

db.collection( viewingProgressList, function ( err, collection ) {
		collection.insert( _activities, { safe: true }, function( err, result ) {
			if(err){
				console.log(err);
				res.send(404,err);
			}else{
				//console.log(result.toArray);
				res.send(200,result);
			}
		} );
	});
};
exports.deleteAll = function ( req, res ) {
	db.collection( viewingProgressList, function ( err, collection ) {

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
			'date'       : '2014-01-17T06:26:57.036Z'
		},
		{
			'content'    : 'Lorem ipsum incididunt',
			'url'        : '#',
			'inProgress' : true,
			'completion' : 78,
			'date'       : '2014-01-12T06:27:05.062Z'
		},
		{
			'content'    : 'Stage Thirty Seven: Prompt Student And Teacher Repsonse',
			'url'        : '#',
			'inProgress' : false,
			'completion' : 0,
			'date'       : '2014-02-17T06:27:59.746Z'
		},
		{
			'content'    : 'Student And Teacher Repsonse 2',
			'url'        : '#',
			'inProgress' : true,
			'completion' : 40,
			'date'       : '2014-03-17T06:27:59.746Z'
		},
		{
			'content'    : 'Student And Teacher Repsonse 3',
			'url'        : '#',
			'inProgress' : true,
			'completion' : 100,
			'date'       : '2014-02-4T06:27:59.746Z'
		},
		{
			'content'    : 'Student And Teacher Repsonse 4',
			'url'        : '#',
			'inProgress' : true,
			'completion' : 80,
			'date'       : '2014-02-17T06:22:59.746Z'
		},
		{
			'content'    : 'lorem ipsum dolor sit',
			'url'        : '#',
			'inProgress' : true,
			'completion' : 97,
			'date'       : '2014-03-18T06:27:59.746Z'
		}
	];

	db.collection( viewingProgressList, function ( err, collection ) {
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
