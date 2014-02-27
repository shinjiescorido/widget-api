'use strict';

var sDatabase = 'yourProfile';

function calculatePercentage () {

	var nPercentage = 75;

	return nPercentage
};

function getDescription ( nPercentage ) {

	var sDescription = '';

	if( nPercentage >= 0 && nPercentage <= 25 ) {

		sDescription = 'Please fill in data to your profile!';

	} else if (nPercentage > 25 && nPercentage <= 50 ) {

		sDescription = 'Please complete your profile - its halfway complete!';

	} else if ( nPercentage > 50 && nPercentage <= 99 ) {

		sDescription = 'Your profile is almost complete! The more we know about you, the more relevant the content we show you will be';

	} else {

		sDescription = 'Your profile is complete!';
	}

	return sDescription;
};

exports.findAll = function ( req, res ) {

	db.collection( sDatabase, function ( err, collection ) {
		collection.find().toArray( function ( err, items ) {
			res.send( items );
			console.log( items );
		} );
	} );
};

//curl -X PUT -d "percent=75" localhost:8889/updatePercentage/75
exports.updatePercentage = function( req, res ) {

	db.collection( sDatabase, function ( err, collection ) {
		var id = req.params.id;
		var percent = req.body.percent;
		percent = parseInt(percent);

		if(isNaN(percent)) {
			percent = 25; //default
		}

		var yourProfile =
		{
			percentage : percent,
			description : getDescription( percent )
		};

		console.log(' new values :');
		console.log(yourProfile);

		collection.update( { percentage : parseInt(id) }, yourProfile, { safe: true }, function( err, doc ) {
			if (err) {
				console.log(err);
				res.send(404, err);
			} else {
				res.send(200, doc);
				console.log( 'success', doc );
			}
		} );

	});
};

exports.populateDB = function () {

	var nPercentage = calculatePercentage();

	var yourProfile = {

		description: getDescription( nPercentage ) ,
		percentage: nPercentage

	} ;

	db.collection( sDatabase, function ( err, collection ) {
		collection.insert( yourProfile, {
			safe: true
		}, function ( err, result ) {} )
	} );
};
