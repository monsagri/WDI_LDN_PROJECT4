const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
var csv = require('fast-csv');


const User = require('../models/User');
const marchData = require('./data/test12.json');



function addDate() {
  testData.transactions.forEach(transcation => transcation.date = transcation.created.substring(0,10));
}

function cleanNumbers() {
  testData.transactions.forEach(transaction => {
    transaction.amount = transaction.amount.replace(/,/g, '');
    transaction.local_amount = transaction.local_amount.replace(/,/g, '');
  });
}

const csvInput = [];
csv
  .fromPath('testdata12.csv', {headers: true})
  .on('data', function(data){
    csvInput.push(data);
  })
  .on('end', function(){
    console.log('done');
    console.log(csvInput);
  });


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


mongoose.connect(dbURI, (err, db) => {
  // console.log(testData);
  db.dropDatabase()
    // .then(csvInput => addDate(csvInput))
    .then(() => testData.transactions = csvInput)
    .then(() => addDate())
    .then(() => cleanNumbers())
    .then(() => console.log('connected to db and cleared it'))
    .then(() => User.create(testData))
    .then((users) => console.log(`${users} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
