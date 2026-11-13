const fs = require("fs");
const path = require("path");
const { home } = require("../controllers/controller");
const datapath = path.join(__dirname, "../data/homeData.json");

class homes {
  constructor(houseName, location, price, url) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.url = url;
  }
  save() {
    homes.fetchAll((registeredHomes) => {
      if (this.id) {
        registeredHomes = registeredHomes.map((home) => {
          if (home.id === this.id) {
            return this;
          } else {
            return home;
          }
        });
      } else {
        this.id = String(Math.floor(Math.random() * 1000) + 1);
        registeredHomes.push(this);
      }

      fs.writeFile(datapath, JSON.stringify(registeredHomes), (err) => {
        if (err) {
          console.log("error while writing the file.!");
        } else {
          console.log("file writing successfull");
        }
      });
    });
  }
  static fetchAll(callback) {
    fs.readFile(datapath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    homes.fetchAll((registeredHomes) => {
      const homeFound = registeredHomes.find(
        (home) => String(home.id) === homeId,
      );
      callback(homeFound);

    });
  }

  static deleteHomefunction(homeId, callback) {
    homes.fetchAll((registeredHomes) => {
      homes.findById(homeId, (homeFound) => {
        if (!homeFound) {
          return callback(new Error("Unable to find home for deleting"));
        }
      })
      registeredHomes = registeredHomes.filter(home => home.id !== homeId)
      fs.writeFile(datapath, JSON.stringify(registeredHomes), (err) => {
        if (err) {
          return callback(err);
        }

        callback(null);
      });
    });
  }
}
exports.homes = homes;
