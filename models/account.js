// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  email: {
      type: String,
      query: true
  },
  password: {
      type: String,
      query: true
  },
  date:{
    type: Date, 
    default: Date.now
  },
  role:{
      type: String,
      default: 'user'
  }
});

const AccountModule = mongoose.model('account', AccountSchema);
module.exports = AccountModule