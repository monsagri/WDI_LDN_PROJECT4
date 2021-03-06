const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');

const User = require('../models/User');
const parseCsv = require('../lib/parseCsv');

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
  transactions: []
};

// make a custom promise for middleware?


mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase()
    .then(() => console.log('starting to parse data'))
    .then(() => testData.transactions = parseCsv.monzo('testdata12.csv'))
    .then(() => setTimeout(() => {
      User.create(testData)
        .then((users) => console.log(`${users} users created`))
        .catch(err => console.log(err))
        .finally(() => mongoose.connection.close());
    }, 2000));

});


// mongoose.connect(dbURI, (err, db) => {
//   db.dropDatabase()
//     .then(() => console.log('starting to parse data'))
//     .then(() => parseCsv.monzo('testdata12.csv'))
//     .then(csvInput => testData.transactions = csvInput)
//     .then(() => console.log('connected to db and cleared it'))
//     .then(() => User.create(testData))
//     .then((users) => console.log(`${users} users created`))
//     .catch(err => console.log(err))
//     .finally(() => mongoose.connection.close());
// });
