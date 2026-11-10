const fs = require('fs');
const path = require('path');

class homes {
  constructor(houseName,location,price,url) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.url = url;
  }
  save() {
    homes.fetchAll((registeredHomes) => {
    registeredHomes.push(this);
    const datapath = path.join(__dirname, '../data/homeData.json');
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
    const homeDataPath = path.join(__dirname, '../data/homeData.json');
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
}

exports.homes = homes;