var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

    var server = new Server('localhost', 27017, {auto_reconnect: true});
    db = new Db('widgetsdb', server);
    db.open(function(err, db) {
        if(!err) {
                console.log("Connected to 'widgetsdb' database");
                db.collection('widgets', {strict:true}, function(err, collection) {
                            if (err) {
                                            console.log("The 'widgets' collection doesn't exist. Creating it with sample data...");
                                            populateDB();
                                        }
                        });
            }
    });

exports.findAll = function(req, res) {
    db.collection('widgets', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
            console.log(items);
        });
    });
};

exports.findById = function(req,res){
    var id = req.params.id;
    console.log('Retrieving widget: ' + id);
    db.collection('widgets', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
            console.log(item);
        });
    });
};

exports.deleteWidget = function(req, res) {
    var id = req.params.id;
    console.log('Deleting widget: ' + id);
    db.collection('widgets', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);

            }
        });
    });
}

var populateDB = function() {

    // var widgets = [1,2,3,4,5,6,7,8,9]

    var widgets = [
    {
       userid : 1,
       widgets : [1,3,5]

    },
    {
       userid : 2,
       widgets : [1,2,3]

    },
    {
       userid : 3,
       widgets : [3,4,5,6]

    },
    {
       userid : 4,
       widgets : [7,8,9]

    }];

    db.collection('widgets', function (err, collection){
        collection.insert(widgets,{safe:true}, function(err,result){})
    });
};
