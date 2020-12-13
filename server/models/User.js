const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  userName: {
    type: String
  },
  phone: {
    type:Number
  },
  address: {
    type: String
  }
})


module.exports = mongoose.model('User', schema)