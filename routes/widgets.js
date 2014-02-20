var mongo = require( 'mongodb' );
var BSON = mongo.BSONPure;

exports.findAll = function(req, res) {
    db.collection('widgetData', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
            console.log(items);
        });
    });
};

exports.findById = function(req,res){
    var id = req.params.id;
    console.log('Retrieving widget: ' + id);
    db.collection('widgetData', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
            console.log(item);
        });
    });
};

exports.deleteWidget = function(req, res) {
    var id = req.params.id;
    var widgetid = req.params.widgetid;
    console.log('id ko = '+ widgetid);
    console.log('Deleting widget: ' + id);
    db.collection('widgetData', function(err, collection) {
        // collection.update({ 'userid' : parseInt(id) }, { $pull: { 'widgets' : parseInt(widgetid) }});
        collection.update({ 'userid': parseInt(id)}, { $pull: { 'widgets' : parseInt(widgetid) }}, function(err,result){
              res.send(result);
              if(err){
                res.send(err);
              }
            });
    });
};

//curl -X PUT -d "widgets=groupActivity, yourProfile" localhost:8889/updateUserWidgets/1
//widgets should be comma separated
exports.updateWidgets = function( req, res ) {

console.log('update widget');

  db.collection( 'widgetData' , function ( err, collection ) {
    var id = parseInt(req.params.id);
    var sWidgets = req.body.widgets;

    var arWidget = sWidgets.split(' ');
    var oWidgets =
    {
      id : id,
      widgets :arWidget
    };

    console.log(' new values :');
    console.log(oWidgets);

    collection.update( { id : id }, oWidgets, { safe: true }, function( err, doc ) {
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

exports.populateDB = function() {

    var widgets = [
    {
       id : 1,
       widgets : ['groupActivity']

    },
    {
       id : 2,
       widgets : ['groupActivity', 'yourProfile', 'whatsnew']

    },
    {
       id : 3,
       widgets : ['groupActivity', 'yourProfile', 'whatsnew']

    },
    {
       id : 4,
       widgets : ['groupActivity', 'yourProfile', 'whatsnew']

    }];

    db.collection('widgetData', function (err, collection){
        collection.insert(widgets,{safe:true}, function(err,result){})
    });
};
