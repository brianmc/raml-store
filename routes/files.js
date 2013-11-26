var mongo = require('mongodb');
 
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('ramldb', server);
 
db.open(function(err, db) {
if(!err) {
console.log("Connected to 'ramldb' database");
db.collection('files', {strict:true}, function(err, collection) {
if (err) {
console.log("The 'files' collection doesn't exist. Use POST to add RAML files...");
populateDB();
}
});
}
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving file: ' + id);
    db.collection('files', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            delete item._id;
            res.header("Access-Control-Allow-Origin", "*");
            res.send(item);
         });
     });
};
 
exports.findAll = function(req, res) {
   var filelist = new Object();
   db.collection('files', function(err, collection) {
      collection.find({}, function(err, resultCursor) {
            resultCursor.each(function(err,item) {
               if(item != null){
               console.log('Item : '+item._id+' : ' + JSON.stringify(item));
               filelist[item._id] = item;
               delete filelist[item._id]._id;
               console.log(JSON.stringify(filelist));
               }
               else{
                res.header("Access-Control-Allow-Origin", "*");
                res.send(JSON.stringify(filelist));
		}
            });
        });
   });

};
 
exports.addFile = function(req, res) {
    var file = req.body;
    console.log('Adding file : ' + JSON.stringify(file));

    db.collection('files', function(err, collection) {
        collection.insert(file, {safe:true}, function(err, result) {
           if (err) {
               res.send({'error':'An error has occurred'});
           } else {
               console.log('Success: ' + JSON.stringify(result[0]));
               res.header("Access-Control-Allow-Origin", "*");
               res.send(result[0]);
           }
        });
    });
}
 
exports.updateFile = function(req, res) {
    var id = req.params.id;
    var file = req.body;
    console.log('Updating file: ' + id);
    console.log(JSON.stringify(file));

    db.collection('files', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, file, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating file : ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.header("Access-Control-Allow-Origin", "*");
                res.send('{"status":"success","id":"'+id+'","message":"The file was successfully updated."}');
            }
        });
    });
}
 
exports.deleteFile = function(req, res) {
var id = req.params.id;
console.log('Deleting file: ' + id);
db.collection('files', function(err, collection) {
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

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
var files = [
{
name: "ExampleRAML",
path: "%2F",
contents: "gggggg"
}];
 
db.collection('files', function(err, collection) {
collection.insert(files, {safe:true}, function(err, result) {});
});
 
};
