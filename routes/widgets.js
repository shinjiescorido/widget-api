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
}

exports.populateDB = function() {

    var widgets = [
    {
       userid : 1,
       widgets : ['groupActivity']

    },
    {
       userid : 2,
       widgets : ['groupActivity', 'yourProfile', 'whatsnew']

    },
    {
       userid : 3,
       widgets : ['groupActivity', 'yourProfile', 'whatsnew']

    },
    {
       userid : 4,
       widgets : ['groupActivity', 'yourProfile', 'whatsnew']

    }];

    db.collection('widgetData', function (err, collection){
        collection.insert(widgets,{safe:true}, function(err,result){})
    });
};
