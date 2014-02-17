var express = require( 'express' );
var app = express();
var mongo = require( 'mongodb' );
var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;
var server = new Server( 'localhost', 27017, {
	auto_reconnect: true
} );
var widgets = require( './routes/widgets' );
var groupActivity = require( './routes/groupActivity' );
var yourProfile = require( './routes/yourProfile' );

db = new Db( 'widgetsdb', server );
db.open( function ( err, db ) {
	if ( !err ) {
		console.log( "Connected to 'widgetsdb' database" );
		db.collection( 'widgetData', {
			strict: true
		}, function ( err, collection ) {
			if ( err ) {
				console.log( "The 'widgetData' collection doesn't exist. Creating it with sample data..." );
				widgets.populateDB();
			}
		} );

		db.collection( 'yourProfile', {
			strict: true
		}, function ( err, collection ) {
			if ( err ) {
				console.log( "The 'yourProfile' collection doesn't exist. Creating it with sample data..." );
				yourProfile.populateDB();
			}
		} );

		db.collection( 'groupActivity', { strict: true }, function( err, collection ) {
			if ( err ) {
				console.log( "The 'groupActivity' collection doesn't exist. Creating it with sample data..." );
				groupActivity.populateDB();
			}
		} );
	}
} );

app.configure( function () {
	app.use( express.methodOverride() );
	app.use( express.bodyParser() );
	app.use( function ( req, res, next ) {
		res.header( "Access-Control-Allow-Origin", "*" );
		res.header( "Access-Control-Allow-Headers", "X-Requested-With" );
		next();
	} );
	app.use( app.router );
} );

app.configure( 'development', function () {
	app.use( express.static( __dirname + '/public' ) );
	app.use( express.errorHandler( {
		dumpExceptions: true,
		showStack: true
	} ) );
} );

app.configure( 'production', function () {
	app.use( express.static( __dirname + '/public' ) );
	app.use( express.errorHandler() );
} );

app.get( '/widgets', widgets.findAll );
app.get( '/widgets/:id', widgets.findById );
app.delete( '/widgets/:id/:widgetid', widgets.deleteWidget );

app.get( '/groupactivity', groupActivity.findAll );

app.get( '/yourProfile', yourProfile.findAll );

app.post( '/groupactivity', groupActivity.addActivity );
app.delete( '/groupactivity/:id', groupActivity.deleteActivity );


app.listen( 8889 );
console.log( 'express running at http://localhost:%d', 8889 );
