const { ObjectId } = require("mongodb");
const { get_db } = require("../utils/databaseUtil");


class homes {
  constructor(houseName, location, price, url, description, _id) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.url = url;
    this.description = description;
    if (_id) { 
      this._id =_id;
    }
  }
  save() {
    let db = get_db();
    if(!this._id)
      return db.collection('homes').insertOne(this)
    else {
      const editHomeObj = { houseName: this.houseName, location: this.location, price: this.price, url: this.url, description: this.description };
      return db.collection('homes').updateOne({ _id: new ObjectId(String(this._id)) }, { $set: editHomeObj })
      }

  }
  
  static fetchAll() {
    let db = get_db();
    return db.collection('homes').find().toArray();
  }
  
  static findById(id) {
    let db = get_db();
    return db.collection('homes').find({_id: new ObjectId(String(id))}).next();
  }

  static deleteHomefunction(id) {
     let db = get_db();
    return db.collection('homes').deleteOne({ _id: new ObjectId(String(id)) });
  }
}
exports.homes = homes;
