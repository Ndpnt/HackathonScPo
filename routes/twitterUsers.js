var express = require('express');
var router = express.Router();

const Twit = require('twit');
const TwitterUser = require('../models/twitterUser');

const Twitter = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	TwitterUser.find({}, function(err, users) {
		var userMap = {};

		users.forEach(function(user) {
			userMap[user._id] = user;
		});

		res.send(userMap);
	});
});

router.get('/:screen_name', function(req, res, next) {
	const screen_name = req.params.screen_name;

	return TwitterUser.findOne({ screen_name: screen_name })
		.then((user) => {
			if (!user) {
				return Twitter.get('users/show', { screen_name: screen_name }, function(error, twitterData, response) {
					if (error) {
						return next(error);
					}

					const twitterUser = new TwitterUser({
						screen_name: screen_name,
						twitterData: twitterData,
					});

					return twitterUser.save(function (err) {
						if (err) {
							next(err);
						}

						return res.render('twitterUser', { user: twitterUser.twitterData });
					});
				});
			}

			return res.render('twitterUser', { user: user.twitterData });
		}).catch((err) => {
			next(err);
		});
});

router.post('/:screen_name', function(req, res, next) {
	const screen_name = req.params.screen_name;
	const category = req.body.category;

	TwitterUser.findOne({ screen_name: screen_name })
		.then((user) => {
			if (!user) {
				return console.error('no user');
			}

			user.category = category;
			return user.save();
		})
		.then(() => {
			res.redirect('/');
		})
});

module.exports = router;
