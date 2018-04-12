/* global api, describe, it, expect, beforeEach */

const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const userData = { username: 'test', email: 'test@test.com', password: 'test', passwordConfirmation: 'test' };
let token;

describe('get /users/', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(done);
  });

  it('should return a 401 response', done => {
    api

      .get('/api/users/')
      .expect(401, done);
  });

  it('should return an array of users with a token', done => {
    api
      .get('/api/users/')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.include.keys([
          '_id',
          'username',
          'email',
          'created',
          'transactions'
        ]);
        done();
      });

  });
});
