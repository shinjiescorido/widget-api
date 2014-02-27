var groupActivityList = 'groupActivity';
var ObjectID = require('mongodb').ObjectID;

exports.findAll = function( req, res ) {
	db.collection( groupActivityList, function( err, collection ) {
		collection.find().toArray( function( err, items ) {
			res.send( items );
			console.log( 'Fetching groups' );
		});
	});
};


//curl -d "content=<a href = \"#\">Ann Perkins</a> shared a video with you&type=video&url=#&imgIcon=http://builtbyhq.com/projects/sinet/img/green-play.png" http://localhost:3001/groupactivity

//curl -d "content=<a href=\"\">Ogden School District</a> invited you to join&type=group&url=#&imgIcon=http://builtbyhq.com/projects/sinet/img/green-group.png" http://localhost:3001/groupactivity

//curl -d "content=<a href=\"\">Ron Swanson</a> shared a lesson plan with you&type=file&url=#&imgIcon=http://builtbyhq.com/projects/sinet/img/green-file.png" http://localhost:3001/groupactivity

//curl -d "content=<a href = \"#\">Ann Perkins</a> shared a video with you&type=video&url=#&imgIcon=http://builtbyhq.com/projects/sinet/img/green-play.png" http://localhost:3001/groupactivity

//curl -d "content=<a href = \"#\">Ann Perkins</a> shared a video with you&type=video&url=#&imgIcon=http://builtbyhq.com/projects/sinet/img/green-play.png" http://localhost:3001/groupactivity

exports.addActivity = function( req, res) {
	var activities = [
		{
			content : req.body.content,
			date    : new Date(),
			type    : req.body.type,
			url     : req.body.url,
			imgIcon : req.body.imgIcon
		}
	];
	db.collection( groupActivityList, function ( err, collection ) {
		collection.insert( activities, { safe: true }, function( err, doc ) {
			if (err) {
				console.log(err);
				res.send(404, err);
			} else {
				res.send(200, doc);
			}
		} );
	});
}

//curl -X DELETE 'http://localhost:3001/groupactivity/'
exports.deleteActivity = function( req, res ) {
	db.collection( groupActivityList, function ( err, collection ) {
		var id = req.params.id;
		collection.remove( { _id: new ObjectID( id ) }, 1, function( err, doc ) {
			if (err) {
				console.log(err);
				res.send(404, err);
			} else {
				console.log(doc);
				console.log(id);
				res.send(200, doc);
			}
		} )
	});
}

exports.populateDB = function() {
	var activities = [
		{
			"content" : "<a href = \"#\">Ann Perkins</a> shared a video with you",
			"date"    : "2014-02-17T06:26:57.036Z",
			"type"    : "video",
			"url"     : "#",
			"imgIcon" : "http://builtbyhq.com/projects/sinet/img/green-play.png",
			"_id"     : "5301abb18719792110ef018a"
		},
		{
			"content" : "<a href=\"\">Ogden School District</a> invited you to join",
			"date"    : "2014-02-17T06:27:05.062Z",
			"type"    : "group",
			"url"     : "#",
			"imgIcon" : "http://builtbyhq.com/projects/sinet/img/green-group.png",
			"_id"     : "5301abb98719792110ef018b"
		},
		{
			"content" : "<a href=\"\">Ron Swanson</a> shared a lesson plan with you",
			"date"    : "2014-02-17T06:27:59.746Z",
			"type"    : "file",
			"url"     : "#",
			"imgIcon" : "http://builtbyhq.com/projects/sinet/img/green-file.png",
			"_id"     : "5301abef8719792110ef018e"
		}
	];

	db.collection( groupActivityList, function ( err, collection ) {
	    collection.insert( activities, { safe: true }, function( err, result ) { } )
	});
};
