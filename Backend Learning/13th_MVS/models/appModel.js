const fs = require('fs');
let registeredHomes = [];

class homes {
  constructor(houseName,location,price,url) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.url = url;
  }
  save() {
    registeredHomes.push(this);
    fs.writeFile('../data/homeData.json', JSON.stringify(registeredHomes), (err) => {
      if (err) {
        console.log('error while writing the file.!')
      }
      else {
        console.log('file writing successfull')
      }
    })
  }
  static fetchAll() {
    return registeredHomes;
  }
}

exports.homes = homes;
exports.registeredHomes = registeredHomes;