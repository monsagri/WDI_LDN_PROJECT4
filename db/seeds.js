const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');


const User = require('../models/User');
const marchData = require('./data/test12.json');

function addDate() {
  testData.transactions.forEach(transaction => transaction.date = transaction.created.substring(0,10));
}

const testData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test',
  admin: true,
  accounts: [
    {
      name: 'Money',
      type: 'current',
      bank: 'Monzo'
    },
    {
      name: 'Cash',
      type: 'Cash',
      bank: 'Wallet'
    }
  ],
  transactions: marchData
};


mongoose.connect(dbURI, (err, db) => {
  // console.log(testData);
  db.dropDatabase()
    .then(() => addDate())
    .then(() => console.log('connected to db and cleared it'))
    .then(() => User.create(testData))
    .then((users) => console.log(`${users} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
