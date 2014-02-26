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
exports.deleteWhatsNew = function ( req, res ) {
	db.collection( whatsNewList, function ( err, collection ) {
		var id = req.params.id;

		collection.remove( { _id: new ObjectID( id ) }, 1, function ( err, doc ) {
			if ( err ) {
				console.log( err );
				res.send( 404, err );
			} else {
				console.log( doc );
				console.log( id );
				res.send( 200, 'deleted..' );
			}
		} );
	} );
};

exports.deleteWhatsNewViaString = function ( req, res ) {
	db.collection( whatsNewList, function ( err, collection ) {
		var id = req.params.id;

		collection.remove( { _id: id }, 1, function ( err, doc ) {
			if ( err ) {
				console.log( err );
				res.send( 404, err );
			} else {
				console.log( doc );
				console.log( id );
				res.send( 200, 'deleted..' );
			}
		} );
	} );
};


exports.addWhatsNew = function(req,res) {
var _title = (req.params.title)?req.params.title:'Sample Content';
	var _activities = [
		{
			"content" : _title,
			"date"    : new Date(),
			"type"    : "video",
			"url"     : "#",
			"imgIcon" : "http://builtbyhq.com/projects/sinet/img/green-play.png"
		}
		];

	db.collection( whatsNewList, function ( err, collection ) {
		collection.insert( _activities, { safe: true }, function( err, result ) { 
			if(err){
				console.log(err);
				res.send(404,err);
			}else{
				console.log(result.toArray);
				res.send(200,result);
			}
		} )
	});
};
exports.populateDB = function() {
	var activities = [
  {
    "content": "Classroom Management",
    "date": "2014-02-17T06:26:57.036Z",
    "type": "video",
    "url": "#",
    "imgIcon": "http://builtbyhq.com/projects/sinet/img/green-play.png"
  },
  {
    "content": "Assessment",
    "date": "2014-02-17T06:27:05.062Z",
    "type": "video",
    "url": "#",
    "imgIcon": "http://builtbyhq.com/projects/sinet/img/green-play.png"
  },
  {
    "content": "Special Education",
    "date": "2014-02-17T06:27:59.746Z",
    "type": "video",
    "url": "#",
    "imgIcon": "http://builtbyhq.com/projects/sinet/img/green-play.png"
  },
  {
    "content": "Equity",
    "date": "2014-02-17T06:28:46.585Z",
    "type": "video",
    "url": "#",
    "imgIcon": "http://builtbyhq.com/projects/sinet/img/green-play.png"
  },
  {
    "content": "Compliance",
    "date": "2014-02-17T06:28:56.294Z",
    "type": "video",
    "url": "#",
    "imgIcon": "http://builtbyhq.com/projects/sinet/img/green-play.png"
  },
  {
    "content": "ELL",
    "date": "2014-02-17T06:28:56.294Z",
    "type": "video",
    "url": "#",
    "imgIcon": "http://builtbyhq.com/projects/sinet/img/green-play.png"
  },
  {
    "content": "Instructional Strategies",
    "date": "2014-02-17T06:28:56.294Z",
    "type": "video",
    "url": "#",
    "imgIcon": "http://builtbyhq.com/projects/sinet/img/green-play.png"
  }
	];

	db.collection( whatsNewList, function ( err, collection ) {
		collection.insert( activities, { safe: true }, function( err, result ) { } )
	});
};