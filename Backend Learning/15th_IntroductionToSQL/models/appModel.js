const db = require("../utils/databaseUtil");

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
    if (this.id) {
      return db.execute('UPDATE homes SET houseName =?, location=?, price=?, url=?,description=? WHERE id=?',[this.houseName, this.location, this.price, this.url, this.description,this.id])
    } else {
      return db.execute(
        "INSERT INTO homes (houseName, location, price, url,description) VALUES (?,?,?,?,?) ",
        [this.houseName, this.location, this.price, this.url, this.description]
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(id) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [id]);
  }

  static deleteHomefunction(id) {
    return db.execute("DELETE FROM homes WHERE id = ?", [id]);
  }
}
exports.homes = homes;
