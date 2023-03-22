const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://youssefelsawy:7WE62UIa4j25Yd31@cluster0.4uq3vsh.mongodb.net/shop?retryWrites=true&w=majority'
)
    .then(client => {
        console.log("connected!");
        _db = client.db() ;
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

};

function getDb() {
    if (_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;