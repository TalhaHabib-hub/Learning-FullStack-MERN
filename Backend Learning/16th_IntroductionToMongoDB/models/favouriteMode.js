const { ObjectId } = require('mongodb');
const { get_db } = require('../utils/databaseUtil');


exports.Favourite = class Favourite {

  static addToFavourite(homeIdgot) { 
    let db = get_db();
    // WE MUST RETURN THE PROMISE HERE
    return db.collection('favourites').findOne({ id: homeIdgot }).then(homeexits=>{
      if (homeexits) {
        return Promise.resolve();
      } 
       return db.collection('favourites').insertOne({ id: homeId });
    } )
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