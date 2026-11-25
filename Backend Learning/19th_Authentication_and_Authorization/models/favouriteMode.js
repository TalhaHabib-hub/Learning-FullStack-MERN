const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  homeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'homes',
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('Favourite', favouriteSchema);