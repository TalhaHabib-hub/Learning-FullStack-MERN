const dns = require('dns');
dns.setServers(['1.1.1.1', '1.0.0.1']);
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const MONGO_URL = "mongodb+srv://talhahabib842653_db_user:842653574159@cluster0.btizmj9.mongodb.net/";

let _db;

const MongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL).then(client => {
    callback(client);
    _db = client.db("airbnb");
  }).catch(err => {
    console.log('Error while connecting to mongo', err);
  });
}

let get_db = () => {
  if (!_db) {
    throw new Error('mongo not connected');
  }
  else {
    return _db;
  }
}

exports.MongoConnect = MongoConnect;
exports.get_db = get_db;
