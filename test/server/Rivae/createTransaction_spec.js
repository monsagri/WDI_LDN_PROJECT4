/* global api, describe, it, expect, beforeEach */

const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const transactionData = {
  name: 'Life',
  artist: 'Des\'ree',
  releaseDate: '08-06-1998',
  genre: 'Pop',
  album: 'Supernatural'
};

const userData = { username: 'test', email: 'test@test.com', password: 'test', passwordConfirmation: 'test' };
let token;

describe('POST /bangers', () => {
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
      .post(`/api/users/${token.sub}/transactions`)
      .send(transactionData)
      .expect(401, done);
  });

  it('should return a 201 response with a token', done => {
    api
      .post(`/api/users/${token.sub}/transactions`)
      .set('Authorization', `Bearer ${token}`)
      .send(transactionData)
      .expect(201, done);
  });

  it('should return the created transaction', done => {
    api
      .post(`/api/users/${token.sub}/transactions`)
      .set('Authorization', `Bearer ${token}`)
      .send(transactionData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys([
          '_id',
          'name',
          'artist',
          'releaseDate',
          'genre',
          'album'
        ]);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post(`/api/users/${token.sub}/transactions`)
      .set('Authorization', `Bearer ${token}`)
      .send(transactionData)
      .end((err, res) => {
        expect(res.body.name).to.eq(transactionData.name);
        expect(res.body.artist).to.eq(transactionData.artist);
        expect(res.body.releaseDate).to.deep.eq(transactionData.releaseDate);
        expect(res.body.genre).to.eq(transactionData.genre);
        expect(res.body.album).to.eq(transactionData.album);
        done();
      });
  });
});
