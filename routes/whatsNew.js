var whatsNewList = 'whatsNew';
var ObjectID = require('mongodb').ObjectID;

exports.findAll = function( req, res ) {
	db.collection( whatsNewList, function( err, collection ) {
		collection.find().toArray( function( err, items ) {
			res.send( items );
			console.log( 'Fetching groups' );
		});
	});
};

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
	db.collection( whatsNewList, function ( err, collection ) {
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
	/*db.collection( whatsNewList, function ( err, collection ) {
		var id = req.params.id;
		collection.remove( { _id: new ObjectID( id ) }, 1, function( err, doc ) {
			if (err) {
				console.log(err);
				res.send(404, err);
			} else {
				console.log(doc.toArray);
				console.log(id);
				res.send(200, doc);
			}
		} )
	});*/
db.collection('sessions', function(err, collection) {
    collection.remove({});
});
}

exports.populateDB = function() {
	var activities = [
		{
			"content" : "<a href=\"\">Classroom Management</a>",
			"date"    : "2014-02-17T06:26:57.036Z",
			"type"    : "video",
			"url"     : "#",
			"imgIcon" : "http://builtbyhq.com/projects/sinet/img/green-play.png",
			"_id"     : "5301abb18719792110ef018u"
		},
		{
			"content" : "<a href=\"\">Assessment</a>",
			"date"    : "2014-02-17T06:27:05.062Z",
			"type"    : "video",
			"url"     : "#",
			"imgIcon" : "http://builtbyhq.com/projects/sinet/img/green-play.png",
			"_id"     : "5301abb98719792110ef018v"
		},
		{
			"content" : "<a href=\"\">Special Education</a>",
			"date"    : "2014-02-17T06:27:59.746Z",
			"type"    : "video",
			"url"     : "#",
			"imgIcon" : "http://builtbyhq.com/projects/sinet/img/green-play.png",
			"_id"     : "5301abef8719792110ef018w"
		},
		{
			"content" : "<a href = \"#\">Equity</a>",
			"date"    : "2014-02-17T06:28:46.585Z",
			"type"    : "video",
			"url"     : "#",
			"imgIcon" : "http://builtbyhq.com/projects/sinet/img/green-play.png",
			"_id"     : "5301ac1e8719792110ef017x"
		},
		{
			"content" : "<a href = \"#\">Compliance</a>",
			"date"    : "2014-02-17T06:28:56.294Z",
			"type"    : "video",
			"url"     : "#",
			"imgIcon" : "http://builtbyhq.com/projects/sinet/img/green-play.png",
			"_id"     : "5301ac288719792110ef0112"
		},
		{
			"content" : "<a href = \"#\">ELL</a>",
			"date"    : "2014-02-17T06:28:56.294Z",
			"type"    : "video",
			"url"     : "#",
			"imgIcon" : "http://builtbyhq.com/projects/sinet/img/green-play.png",
			"_id"     : "5301ac288719792110ef0192"
		},
		{
			"content" : "<a href = \"#\">Instructional Strategies</a>",
			"date"    : "2014-02-17T06:28:56.294Z",
			"type"    : "video",
			"url"     : "#",
			"imgIcon" : "http://builtbyhq.com/projects/sinet/img/green-play.png",
			"_id"     : "5301ac288719792110ef0194"
		}
	];

	db.collection( whatsNewList, function ( err, collection ) {
	    collection.insert( activities, { safe: true }, function( err, result ) { } )
	});
};
