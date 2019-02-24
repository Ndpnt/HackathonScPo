const mongoose = require('mongoose');

const twitterUserSchema = new mongoose.Schema({
  screen_name: {
    type: String,
    required: true,
    unique: true
  },
  category: String,
  twitterData: Object
});

const TwitterUser = mongoose.model('TwitterUser', twitterUserSchema);

module.exports = TwitterUser;
