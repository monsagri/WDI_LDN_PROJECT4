const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const transactionSchema = new mongoose.Schema({
  id: { type: String },
  created: { type: Date },
  amount: { type: Number, required: true },
  date: { type: String },
  currency: { type: String },
  local_amount: { type: Number },
  local_currency: { type: String },
  category: { type: String },
  emoji: { type: String },
  description: { type: String },
  address: { type: String },
  notes: { type: String },
  receipt: { type: String }

});

const budgetCategories = new mongoose.Schema({
  name: { type: String, required: true },
  budgeted: { type: Number, default: 0 }
});

// this schema needs virtuals to calculate the current spending for its categories

// also a virtual to calculate the difference between budgeted an spending

const budgetMonthSchema = new mongoose.Schema({
  monthStarting: { type: Date },
  categories: [ budgetCategories ]
});

// budgetMonthSchema.pre('save', function(next) {
//   if(!this.isNew) return next();
//
//   this.categories = [
//     { name: '' },
//     { name: '' },
//     { name: '' },
//     { name: '' },
//     { name: '' },
//     { name: '' }
//   ];
//   next();
// });



const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  avatar: { type: String, default: 'https://enbaca.com/web/assets/image-resources/avatar.png'},
  admin: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true }, // needs a pattern!
  password: { type: String, required: true },
  created: { type: Date, default: new Date()},
  transactions: [ transactionSchema ],
  budget: [ budgetMonthSchema ],
  categories: []

});

userSchema.pre('save', function(next) {
  if(!this.isNew) return next();

  this.categories = [
    'rent',
    'insurance',
    'groceries',
    'eating_out',
    'drinks'
  ];
  next();
});

userSchema
  .virtual('balance')
  .get(function calculateBalance() {
    return this.transactions
      .map(transaction => transaction.amount)
      .reduce((sum, amount) => sum + amount, 0);
  });

userSchema
  .virtual('totalSpending')
  .get(function calculateSpending() {
    return this.transactions
      .filter(transactions => transactions.amount < 0)
      .map(transaction => transaction.amount)
      .reduce((sum, amount) => sum + amount, 0);
  });

userSchema
  .virtual('totalIncome')
  .get(function calculateIncome() {
    return this.transactions
      .filter(transactions => transactions.amount > 0)
      .map(transaction => transaction.amount)
      .reduce((sum, amount) => sum + amount, 0);
  });

userSchema
  .virtual('uniqueCategories')
  .get(function findCategories() {
    let categories = [];
    this.transactions
      .map(transaction => transaction.category)
      .reduce((unique, category) => {
        if (!unique.includes(category)) unique.push(category);
        return categories = unique;
      } ,[]);
    return categories;
  });

userSchema
  .virtual('spendingByCategory')
  .get(function findCategorySpending() {
    // uniqueCategories
    let categories = [];
    this.transactions
      .map(transaction => transaction.category)
      .reduce((unique, category) => {
        if (!unique.includes(category)) unique.push(category);
        return categories = unique;
      } ,[]);
    // Creating Object to hold spending data
    const categoriesObject = {};
    categories.forEach(category => categoriesObject[category] = 0);
    // Filling Object with data
    categories.forEach(category => {
      // Fill each Category individually, find spending, sum it and add as value
      categoriesObject[category] = this.transactions
        .filter(transaction => transaction.category === category && transaction.amount < 0)
        .map(transaction => transaction.amount)
        .reduce((sum, amount) => sum + amount, 0);
    });

    return categoriesObject ;
  });

userSchema
  .virtual('incomeByCategory')
  .get(function findCategoryIncome() {
    // uniqueCategories
    let categories = [];
    this.transactions
      .map(transaction => transaction.category)
      .reduce((unique, category) => {
        if (!unique.includes(category)) unique.push(category);
        return categories = unique;
      } ,[]);
    // Creating Object to hold spending data
    const categoriesObject = {};
    categories.forEach(category => categoriesObject[category] = 0);
    // Filling Object with data
    categories.forEach(category => {
      // Fill each Category individually, find spending, sum it and add as value
      categoriesObject[category] = this.transactions
        .filter(transaction => transaction.category === category && transaction.amount > 0)
        .map(transaction => transaction.amount)
        .reduce((sum, amount) => sum + amount, 0);
    });

    return categoriesObject ;
  });

// This isn't ideal, Monzo only has a description field, not a Payee field
userSchema
  .virtual('uniquePayees')
  .get(function findPayees() {
    let payees = [];
    this.transactions
      .map(transaction => transaction.description)
      .reduce((unique, description) => {
        if (!unique.includes(description)) unique.push(description);
        return payees = unique;
      } ,[]);
    return payees;
  });

userSchema
  .virtual('spendingByPayee')
  .get(function findPayeeSpending() {
    let payees = [];
    this.transactions
      .map(transaction => transaction.description)
      .reduce((unique, description) => {
        if (!unique.includes(description)) unique.push(description);
        return payees = unique;
      } ,[]);
    const payeesObject = {};
    payees.forEach(payee => payeesObject[payee] = 0);
    // Filling Object with data
    payees.forEach(payee => {
      // Fill each Payee individually, find spending, sum it and add as value
      payeesObject[payee] = this.transactions
        .filter(transaction => transaction.description === payee && transaction.amount < 0)
        .map(transaction => transaction.amount)
        .reduce((sum, amount) => sum + amount, 0);
    });
    return payeesObject;
  });

userSchema
  .virtual('incomeByPayee')
  .get(function findPayeeIncome() {
    let payees = [];
    this.transactions
      .map(transaction => transaction.description)
      .reduce((unique, description) => {
        if (!unique.includes(description)) unique.push(description);
        return payees = unique;
      } ,[]);
    const payeesObject = {};
    payees.forEach(payee => payeesObject[payee] = 0);
    // Filling Object with data
    payees.forEach(payee => {
      // Fill each Payee individually, find spending, sum it and add as value
      payeesObject[payee] = this.transactions
        .filter(transaction => transaction.description === payee && transaction.amount > 0)
        .map(transaction => transaction.amount)
        .reduce((sum, amount) => sum + amount, 0);
    });
    return payeesObject;
  });

userSchema
  .virtual('absoluteSpendingByDate')
  .get(function findabsoluteSpendingByDate() {
    // unique dates
    let dates = [];
    this.transactions
      .map(transaction => transaction.date)
      .reduce((unique, date) => {
        if (!unique.includes(date)) unique.push(date);
        return dates = unique;
      } ,[]);
    // Creating Object to hold spending data
    const datesObject = {};
    dates.forEach(date => datesObject[date] = 0);
    // Filling Object with data
    dates.forEach(date => {
      // Fill each Category individually, find spending, sum it and add as value
      datesObject[date] = this.transactions
        .filter(transaction => transaction.date === date)
        .map(transaction => transaction.amount)
        .reduce((sum, amount) => sum + amount, 0);
    });

    return datesObject ;
  });

userSchema
  .virtual('balanceByDate')
  .get(function findbalanceByDate() {
    // unique dates
    let dates = [];
    this.transactions
      .map(transaction => transaction.date)
      .reduce((unique, date) => {
        if (!unique.includes(date)) unique.push(date);
        return dates = unique;
      } ,[]);
    // Creating Object to hold spending data
    const datesObject = {};
    // Filling Object with data
    dates.forEach(date => {
      // Fill each Category individually, find spending, sum it and add as value
      datesObject[new Date(date)] = this.transactions
        .filter(transaction => transaction.date <= date)
        .map(transaction => transaction.amount)
        .reduce((sum, amount) => sum + amount, 0);
    });

    return datesObject ;
  });

// Add the virtual for passwordConfirmation
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

//pre-validate hook ->
userSchema.pre('validate', function checkPassword(next) {
//password modification validation ->
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
//rehash modified password ->
  if(this.isModified('password')) {
    //store hashed bcrypt password and add to user object ->
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// compareSync to compare plain text to hash ->
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
