const mongoose = require('mongoose');

const Twit = require('twit');
const Twitter = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const twitterUserSchema = new mongoose.Schema({
  screen_name: {
    type: String,
    required: true,
    unique: true
  },
  category: String,
  twitterData: Object
});

twitterUserSchema.methods.fetchTwitterData = function fetchTwitterData () {
  return new Promise((resolve, reject) => {
    Twitter.get('users/show', { screen_name: this.screen_name }, (error, twitterData, response) => {
      if (error) {
        return reject(error);
      }

      this.twitterData = twitterData;

      this.save()
        .then(resolve)
        .catch(reject);
    });
  });
};

const TwitterUser = mongoose.model('TwitterUser', twitterUserSchema);
module.exports = TwitterUser;
