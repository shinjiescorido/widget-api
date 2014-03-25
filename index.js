var express = require( 'express' );
var app     = express();
var mongo   = require( 'mongodb' );
var Server  = mongo.Server;
var Db      = mongo.Db;
var BSON    = mongo.BSONPure;
var server  = new Server( 'localhost', 27017, {
	auto_reconnect: true
} );
var widgets          = require( './routes/widgets' );
var groupActivity    = require( './routes/groupActivity' );
var yourProfile      = require( './routes/yourProfile' );
var learningTargets  = require( './routes/learningTargets' );
var viewingProgress  = require( './routes/viewingProgress' );
var process          = require( './routes/process' );
var whatsNew         = require( './routes/whatsNew' );
var observationsOfMe = require('./routes/observations-of-me');
var whatsHot         = require('./routes/whatsHot');

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


		db.collection( 'observationsOfMe', { strict: true }, function( err, collection ) {
			if ( err ) {
				console.log( "The 'observationsOfMe' collection doesn't exist. Creating it with sample data..." );
				observationsOfMe.populateDB();
			}
		} );
		db.collection( 'whatsHot', { strict: true }, function( err, collection ) {
			if ( err ) {
				console.log( "The 'whatsHotList' collection doesn't exist. Creating it with sample data..." );
				whatsHot.populateDB();
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


app.get( '/widgets', widgets.findAll );
app.get( '/widgets/:id', widgets.findById );
app.put( '/widgets/:id', widgets.updateWidgets );
app.delete( '/widgets/:id/:widgetid', widgets.deleteWidget );

// Group Activity
app.get( '/groupactivity', groupActivity.findAll );
app.post( '/groupactivity', groupActivity.addActivity );
app.delete( '/groupactivity/:id', groupActivity.deleteActivity );

// Observations of Me
app.get( '/observationsOfMe', observationsOfMe.findAll );
app.post( '/observationsOfMe', observationsOfMe.addObservation );
app.delete( '/observationsOfMe/:id', observationsOfMe.deleteObservation );

// Your Profile
app.get( '/yourProfile', yourProfile.findAll );
app.put( '/updatePercentage/:id', yourProfile.updatePercentage );

// Whats New
app.get( '/whatsnew', whatsNew.findAll );
app.get( '/deletewhatsnew/:id', whatsNew.deleteWhatsNew );
app.get( '/deletewhatsnews/:id', whatsNew.deleteWhatsNewViaString);
app.get( '/addwhatsnew/:title', whatsNew.addWhatsNew );

// viewing progress
app.get( '/viewingProgress', viewingProgress.findAll );
app.get( '/viewingProgress/populateDB', viewingProgress.populateDB );
app.get( '/viewingProgress/deleteAll', viewingProgress.deleteAll );
app.post( '/addviewingprogress', viewingProgress.addViewingProgressPost );
app.delete( '/viewingProgress/:id', viewingProgress.deleteActivity );
app.get( '/addviewingprogress/:title/:completion/:date', viewingProgress.addViewingProgress );

// process widgets
app.get( '/process', process.findAll );
app.get( '/process/populateDB', process.populateDB );
app.get( '/process/deleteAll', process.deleteAll );
//app.post( '/viewingProgress', viewingProgress.addActivity );
app.delete( '/process/:id', process.deleteActivity );
app.get( '/addprocess/:title/:completion/:date', process.addViewingProgress );
app.post( '/addprocess', process.addViewingProgressPost );

// Learning Targets
app.get( '/learningTargets', learningTargets.findAll );
app.get( '/learningTargets/populateDB', learningTargets.populateDB );
app.get( '/learningTargets/deleteAll', learningTargets.deleteAll );
app.post( '/learningTargets', learningTargets.addActivity );
app.delete( '/learningTargets/:id', learningTargets.deleteActivity );

// Whats Hot
app.get('/whatshot',whatsHot.findAll);
app.get('/deletewhatshot/:id',whatsHot.deleteWhatsHot);
app.get('/addwhatshot/:title/:views',whatsHot.addWhatsHot);

app.listen( 8889 );
console.log( 'express running at http://localhost:%d', 8889 );
