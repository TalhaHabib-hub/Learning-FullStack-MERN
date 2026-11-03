// core module
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/utilpaths");

const filePath = path.join(rootDir, "data", "homes.json");
let addedHomes = [];

if (!Array.isArray(addedHomes)) {
  throw new TypeError("Home data must be a JSON array.");
}

const saveHomes = () => {
  fs.writeFileSync(filePath, JSON.stringify(addedHomes, null, 2));
};

module.exports = class Home {
  constructor(addedHome, pricePerNight, location, image, rating) {
    this.addedHome = addedHome;
    this.pricePerNight = pricePerNight;
    this.location = location;
    this.image = image;
    this.rating = rating;
  }
  save() {
    addedHomes.push(this);
    try {
      saveHomes();
    } catch (err) {
      addedHomes.pop();
      throw err;
    }
  }
  static delete(homeIndex) {
    const [deletedHome] = addedHomes.splice(homeIndex, 1);
    try {
      saveHomes();
      return deletedHome;
    } catch (err) {
      addedHomes.splice(homeIndex, 0, deletedHome);
      throw err;
    }
  }
  static fetchAll(callback) {
    const filePath = path.join(rootDir, "data", "homes.json");
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        addedHomes = JSON.parse(data)
      }
      callback(err, addedHomes);
    });
  }
}