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

    db.collection('widgetData', function (err, collection){
        collection.insert(widgets,{safe:true}, function(err,result){})
    });
};
