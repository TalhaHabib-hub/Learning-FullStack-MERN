const fs = require('fs');
const path = require('path');
const datapath = path.join(__dirname, '../data/homeData.json');
    
class homes {
  constructor(houseName, location, price, url) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.url = url;
  }
  save() {
    this.id = Math.floor(Math.random() * 1000) + 1;
    homes.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
  
      fs.writeFile(datapath, JSON.stringify(registeredHomes), (err) => {
        if (err) {
          console.log('error while writing the file.!')
        }
        else {
          console.log('file writing successfull')
        }
      })
    })
   
  }
  static fetchAll(callback) {

    fs.readFile(datapath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    homes.fetchAll((registeredHomes) => {
      const homeFound = registeredHomes.find((home) => String(home.id) === homeId);
      callback(homeFound);
    });
  }
}
exports.homes = homes;