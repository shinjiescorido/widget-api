var whatsHotList = 'whatsHot';
var ObjectID = require('mongodb').ObjectID;

exports.findAll = function( req, res ) {
	db.collection( whatsHotList, function( err, collection ) {
		collection.find().toArray( function( err, items ) {
			res.send( items );
			console.log( 'Fetching groups' );
		});
	});
};

exports.addWhatsHot = function ( req, res ) {
	var _title = (req.params.title)?req.params.title:'Sample Content';
//	var _views = (req.params.views)?req.params.views:0;
	var _activities = [
		{
			"title"  : _title,
			"url"    : "#",
			"imgUrl" : "http://builtbyhq.com/projects/sinet/img/green-play.png",
			"views"  : "0"
		}
		];

db.collection( whatsHotList, function ( err, collection ) {
		collection.insert( _activities, { safe: true }, function( err, result ) {
			if(err){
				console.log(err);
				res.send(404,err);
			}else{
				console.log(result.toArray);
				res.send(200,result);
			}
		} );
	});
};

//curl -X DELETE 'http://localhost:3001/groupactivity/'
exports.deleteWhatsHot = function ( req, res ) {
	db.collection( whatsHotList, function ( err, collection ) {
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

exports.populateDB = function() {
	var activities = [
					{
						'title'  : 'Exploring Fractions',
						'url'    : '#',
						'imgUrl' : 'http://builtbyhq.com/projects/school/CORE/v1/img/green-play.png',
						'views'  : 400
					},
					{
						'title'  : 'The Mysteries of Long Division Lorem Lipsum',
						'url'    : '#',
						'imgUrl' : 'http://builtbyhq.com/projects/school/CORE/v1/img/green-play.png',
						'views'  : 200
					},
					{
						'title'  : 'Classroom Culture',
						'url'    : '#',
						'imgUrl' : 'http://builtbyhq.com/projects/school/CORE/v1/img/green-play.png',
						'views'  : 500
					}
	];

	db.collection( whatsHotList, function ( err, collection ) {
		collection.insert( activities, { safe: true }, function( err, result ) { } );
	});
};