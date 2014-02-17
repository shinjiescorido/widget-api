var sDatabase = 'yourProfile';

exports.findAll = function ( req, res ) {
	db.collection( sDatabase, function ( err, collection ) {
		collection.find().toArray( function ( err, items ) {
			res.send( items );
			console.log( items );
		} );
	} );
};

exports.populateDB = function () {

	var yourProfile = [ {

		id: 1,
		description: 'Your profile is almost complete! The more we know about you, the more relevant the content we show you will be',
		percentage: 75

	}, {


		id: 2,
		description: 'Your profile is almost complete! The more we know about you, the more relevant the content we show you will be',
		percentage: 50

	}, {

		id: 3,
		description: 'Your profile is almost complete! The more we know about you, the more relevant the content we show you will be',
		percentage: 25

	}, {

		id: 4,
		description: 'Your profile is almost complete! The more we know about you, the more relevant the content we show you will be',
		percentage: 1

	} ];

	db.collection( sDatabase, function ( err, collection ) {
		collection.insert( yourProfile, {
			safe: true
		}, function ( err, result ) {} )
	} );
};