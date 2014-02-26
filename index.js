var express = require( 'express' );
var app     = express();
var mongo   = require( 'mongodb' );
var Server  = mongo.Server;
var Db      = mongo.Db;
var BSON    = mongo.BSONPure;
var server  = new Server( 'localhost', 27017, {
	auto_reconnect: true
} );
var widgets         = require( './routes/widgets' );
var groupActivity   = require( './routes/groupActivity' );
var yourProfile     = require( './routes/yourProfile' );
var learningTargets = require( './routes/learningTargets' );
var whatsNew 		= require( './routes/whatsNew' );

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
		
		db.collection( 'whatsNew', { strict: true }, function( err, collection ) {
			if ( err ) {
				console.log( "The 'whatsNewList' collection doesn't exist. Creating it with sample data..." );
				whatsNew.populateDB();
			}
		} );
	}
} );

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
	  res.send(200);
	}
	else {
	  next();
	}
};
app.use(allowCrossDomain);

app.configure( function () {
	app.use( express.methodOverride() );
	app.use( express.bodyParser() );
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


app.get( '/widgets', widgets.populateDB );
app.get( '/widgets/:id', widgets.findById );
app.put( '/widgets/:id', widgets.updateWidgets );
app.delete( '/widgets/:id/:widgetid', widgets.deleteWidget );

// Group Activity
app.get( '/groupactivity', groupActivity.findAll );
app.post( '/groupactivity', groupActivity.addActivity );
app.delete( '/groupactivity/:id', groupActivity.deleteActivity );

// Your Profile
app.get( '/yourProfile', yourProfile.findAll );
app.put( '/updatePercentage/:id', yourProfile.updatePercentage );

// Whats New
app.get( '/whatsnew', whatsNew.findAll );
app.delete( '/whatsnew/:id', whatsNew.deleteActivity );
app.get( '/addwhatsnew', whatsNew.addWhatsNew );

// Learning Targets
app.get( '/learningTargets', learningTargets.findAll );
app.get( '/learningTargets/populateDB', learningTargets.populateDB );
app.get( '/learningTargets/deleteAll', learningTargets.deleteAll );
app.post( '/learningTargets', learningTargets.addActivity );
app.delete( '/learningTargets/:id', learningTargets.deleteActivity );

app.listen( 8889 );
console.log( 'express running at http://localhost:%d', 8889 );
