const { ObjectId } = require('mongodb');
const { get_db } = require('../utils/databaseUtil');


exports.Favourite = class Favourite {

  static addToFavourite(homeId) { 
    let db = get_db();
    Favourite.getfavouriteHomes().then((homesIDs) => {
      const homeExist = homesIDs.some(home => home.id === homeId);
      if (!homeExist) {
        return db.collection('favourites').insertOne({ id: homeId });
      }
    })

  }
  static addToFavourite(homeId) { 
    let db = get_db();
    // WE MUST RETURN THE PROMISE HERE
    return Favourite.getfavouriteHomes().then((homesIDs) => {
      const homeExist = homesIDs.some(home => home.id === homeId);
      if (homeExist) {
        return null;
      } else {
        return db.collection('favourites').insertOne({ id: homeId });
      }
    });
  }

  static removefromfavorite(homeID) {
    let db = get_db();
    return db.collection('favourites').deleteOne({ id: homeID});
  
  }

  static getfavouriteHomes() {
    let db = get_db();
    // The second argument {} is the projection
    // _id: 0 means "exclude the _id field"
    return db.collection('favourites').find({}, { projection: { _id: 0 } }).toArray();
  }
}