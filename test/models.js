const { expect } = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');

const TwitterUser = require('../models/twitterUser');

describe('TwitterUser Model', () => {
  it('should create a new user', (done) => {
    const TwitterUserMock = sinon.mock(new TwitterUser());
    const twitterUser = TwitterUserMock.object;

    TwitterUserMock
      .expects('save')
      .yields(null);

    twitterUser.save((err) => {
      TwitterUserMock.verify();
      TwitterUserMock.restore();
      expect(err).to.be.null;
      done();
    });
  });
});
