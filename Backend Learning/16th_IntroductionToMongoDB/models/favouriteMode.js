const fs = require("fs");
const path = require("path");
const datapath = path.join(__dirname, "../data/favouriteData.json");


exports.Favourite = class Favourite {

  static addToFavourite(homeId, callback) { 
    Favourite.getfavouriteHomes((favouriteHomes) => {
      const homeExists = favouriteHomes.includes(homeId);
      if (!homeExists) {
        favouriteHomes.push( homeId );
        fs.writeFile(datapath, JSON.stringify(favouriteHomes), (err) => {
          if (err) {
            console.error("Error writing to favourite data file:", err);
            callback(err);
          } else {
            callback(null);
          }
        });
      } else {
        callback(null);
      }
    });
  }

  static removefromfavorite(id,callback) {
    Favourite.getfavouriteHomes(favouriteHomes => {
      favouriteHomes = favouriteHomes.filter(each => each !== id);
       fs.writeFile(datapath, JSON.stringify(favouriteHomes), (err) => {
          if (err) {
            console.error("Error writing to favourite data file:", err);
            callback(err);
          } else {
            callback(null);
          }
        });
    })
  }

  static getfavouriteHomes(callback) {
    fs.readFile(datapath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    })
   }
}