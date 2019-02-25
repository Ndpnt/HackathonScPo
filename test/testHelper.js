const dotenv = require('dotenv').config();

const mongoose = require('mongoose');

function clearCollections(done) {
	for (var collection in mongoose.connection.collections) {
		mongoose.connection.collections[collection].remove(function() {});
	}
	return done();
}

before(function (done) {
	if (mongoose.connection.readyState === 0) {
		mongoose.connect("mongodb://localhost/HackathonScPoTest", function (err) {
			if (err) throw err;
			return clearCollections(done);
		});
	} else {
		return clearCollections(done);
	}
});

after(function (done) {
	return clearCollections(() => {
		mongoose.disconnect();
		return done();
	});
});
