require('./testHelper');
const { expect } = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');

const TwitterUser = require('../models/twitterUser');

describe('TwitterUser Model', () => {
  it('should create a new user', (done) => {
    const twitterUser = new TwitterUser({
      screen_name: 'twitter',
    });

    return twitterUser.save(function (err) {
      if (err) {
        done(err);
      }

      expect(err).to.be.null;
      done();
    });
  });

  it('should fetch twitter user data', (done) => {
    const screen_name = "twitterDev";
    const twitterUser = new TwitterUser({
      screen_name: screen_name,
    });

    twitterUser.save().then(() => {
      TwitterUser.findOne({ screen_name: screen_name }, (err, user) => {
        user.fetchTwitterData().then(() => {
          if (err) {
            done(err);
          }

          expect(user.twitterData).to.not.be.undefined;
          expect(user.twitterData.screen_name.toLowerCase()).to.equal(screen_name.toLowerCase());
          done();
        })
        .catch(done);
      });
    });
  });
});
