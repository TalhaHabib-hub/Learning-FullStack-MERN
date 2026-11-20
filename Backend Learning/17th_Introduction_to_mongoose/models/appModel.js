const mongoose = require('mongoose');
const Favourite = require('../models/favouriteMode')

const homeSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  url: String,
  description:  String
  
});

homeSchema.pre('findOneAndDelete', async function () {
  console.log('came to pre hook to delete data id from favouite')
  const homeId = this.getQuery()._id;
  await Favourite.deleteMany({ homeID: homeId });
})


module.exports = mongoose.model('homes', homeSchema);


