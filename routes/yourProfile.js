'use strict';

var sDatabase = 'yourProfile';

exports.findAll = function ( req, res ) {

	db.collection( sDatabase, function ( err, collection ) {
		collection.find().toArray( function ( err, items ) {
			res.send( items );
			console.log( items );
		} );
	} );
};

function calculatePercentage () {

	var nPercentage = 75;

	return nPercentage
};

function getDescription ( nPercentage ) {

	var sDescription = 'Your profile is almost complete! The more we know about you, the more relevant the content we show you will be';

	return sDescription;
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