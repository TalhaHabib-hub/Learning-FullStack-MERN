const { get_db } = require("../utils/databaseUtil");


class homes {
  constructor(houseName, location, price, url, description, id) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.url = url;
    this.description = description;
    this.id = id;
  }
  save() {
    let db = get_db();
    return db.collection('homes').insertOne(this)
  }

  static fetchAll() {
  }

  static findById(id) {
  }

  static deleteHomefunction(id) {
  }
}
exports.homes = homes;
