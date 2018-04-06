const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');


const User = require('../models/user');
const marchData = require('./data/march.json');

const testData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test',
  admin: false,
  accounts: [
    {
      name: 'Money',
      type: 'current',
      bank: 'Monzo'
    }
  ],
  transactions: marchData
};


mongoose.connect(dbURI, (err, db) => {
  console.log(testData);
  db.dropDatabase()
    .then(() => console.log('connected to db and cleared it'))
    .then(() => User.create(testData))
    .then((users) => console.log(users))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
