const fs = require("fs");
const path = require("path");
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
      /*
      callback(homeFound) --------- will call this below function with the home 
      this is callback actually a function which is passed from controller.js file to this function and this function will be called when the home is found or not found
      in controller.js file we have this function which is passed as callback to this function
      callback = (homeFound) => {
           if(homeFound){
               res.render('store/home-detail', {home: homeFound,pageTitle: 'Home Details'});}
           else{
              res.redirect('/');  }
            }
      */
    });
  }

  static deleteHomefunction(homeId, callback) {
    homes.fetchAll((registeredHomes) => {
      const homeFound = registeredHomes.some(
        (home) => String(home.id) === String(homeId),
      );

      if (!homeFound) {
        return callback(new Error("Unable to find home for deleting"));
      }

      const remainingHomes = registeredHomes.filter(
        (home) => String(home.id) !== String(homeId),
      );
      fs.writeFile(datapath, JSON.stringify(remainingHomes), (err) => {
        if (err) {
          return callback(err);
        }

        callback(null);
      });
    });
  }
}
exports.homes = homes;
