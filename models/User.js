const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const transactionSchema = new mongoose.Schema({
  id: { type: String },
  created: { type: Date, default: new Date() },
  amount: { type: Number, required: 'Please provide an amount' },
  date: { type: String, required: 'Please provide a date'  },
  currency: { type: String },
  local_amount: { type: Number },
  local_currency: { type: String },
  category: { type: String, required: 'Please provide a category'  },
  emoji: { type: String },
  description: { type: String, required: 'Please provide a description'  },
  address: { type: String },
  notes: { type: String },
  receipt: { type: String }
});

transactionSchema
  .virtual('date_Object')
  .get(function createDate() {
    return new Date(this.date);
  });

transactionSchema
  .virtual('month')
  .get(function findMonth() {
    return new Date(this.date)
      .getMonth();
  });

transactionSchema
  .virtual('year')
  .get(function findYear() {
    return new Date(this.date)
      .getFullYear();
  });

transactionSchema.set('toJSON', { virtuals: true });

const budgetCategories = new mongoose.Schema({
  name: { type: String, required: true },
  budgeted: { type: Number, default: 0 }
});

const budgetMonthSchema = new mongoose.Schema({
  month: { type: Number },
  year: { type: Number },
  categories: [ budgetCategories ]
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: 'Please choose a username' },
  avatar: { type: String, default: 'https://enbaca.com/web/assets/image-resources/avatar.png'},
  admin: { type: Boolean, default: false },
  email: { type: String, required: 'Please enter your email address', unique: true }, // needs a pattern!
  password: { type: String, required: 'You really should use a password!' },
  created: { type: Date, default: new Date()},
  transactions: [ transactionSchema ],
  budget: [ budgetMonthSchema ],
  categories: []

});

userSchema.pre('save', function(next) {
  if(!this.isNew) return next();

  this.categories = [
    'insurance',
    'cash',
    'eating out',
    'entertainment',
    'fixed costs',
    'household purchases',
    'groceries',
    'shopping',
    'transport',
    'travel'
  ];
  next();
});

userSchema
  .virtual('sortedCategories')
  .get(function sorting() {
    const sortedCategories = _.sortBy(this.categories);

    return sortedCategories;
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
    return _.uniq(this.transactions.map(transaction => transaction.category));
  });

// This isn't ideal, Monzo only has a description field, not a Payee field
userSchema
  .virtual('uniquePayees')
  .get(function findPayees() {
    return _.uniq(this.transactions.map(transaction => transaction.description));
  });

userSchema
  .virtual('uniqueDates')
  .get(function findPayees() {
    return _.uniq(this.transactions.map(transaction => transaction.date));
  });

userSchema
  .virtual('spendingByCategory')
  .get(function findCategorySpending() {
    // Creating Object to hold spending data - initial value is required for victory charts
    const categoriesObject = {initial: 0};
    this.uniqueCategories.forEach(category => categoriesObject[category] = 0);
    // Filling Object with data
    this.uniqueCategories.forEach(category => {
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
    // Creating Object to hold spending data - initial value is required for victory charts
    const categoriesObject = {initial: 0};
    this.uniqueCategories.forEach(category => categoriesObject[category] = 0);
    // Filling Object with data
    this.uniqueCategories.forEach(category => {
      // Fill each Category individually, find spending, sum it and add as value
      categoriesObject[category] = this.transactions
        .filter(transaction => transaction.category === category && transaction.amount > 0)
        .map(transaction => transaction.amount)
        .reduce((sum, amount) => sum + amount, 0);
    });

    return categoriesObject ;
  });


userSchema
  .virtual('spendingByPayee')
  .get(function findPayeeSpending() {
    // Creating Object to hold Data - initial value is required for Victory Charts
    const payeesObject = {initial: 0};
    this.uniquePayees.forEach(payee => payeesObject[payee] = 0);
    // Filling Object with data
    this.uniquePayees.forEach(payee => {
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
    // creating Object to hold data - initial value is required for Victory Charts
    const payeesObject = {initial: 0};
    this.uniquePayees.forEach(payee => payeesObject[payee] = 0);
    // Filling Object with data
    this.uniquePayees.forEach(payee => {
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
    // Creating Object to hold spending data - initial value is required for Victory Charts
    const datesObject = {initial: 0};
    this.uniqueDates.forEach(date => datesObject[date] = 0);
    // Filling Object with data
    this.uniqueDates.forEach(date => {
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
    // Creating Object to hold spending data - initial value is required for Victory Charts
    const datesObject = {initial: 0};
    // Filling Object with data
    this.uniqueDates.forEach(date => {
      // Fill each Category individually, find spending, sum it and add as value
      datesObject[new Date(date)] = this.transactions
        .filter(transaction => transaction.date <= date)
        .map(transaction => transaction.amount)
        .reduce((sum, amount) => sum + amount, 0);
    });
    // Creating a new object with keys sorted by date
    const orderedDatesObject = {};
    Object.keys(datesObject)
    // Sorting through all the dates
      .sort(function compare(a, b) {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA - dateB;
      })
      // retrieving the values from the non-sorted object and storing them in the sroted object
      .forEach(key => orderedDatesObject[key] = datesObject[key]);

    return orderedDatesObject ;
  });

userSchema
  .virtual('transactionsByMonth')
  .get(function findTransactionsByMonth() {
    const allYears = _.uniq(this.transactions.map(transaction => transaction.year));
    // create Object with primary Key Years, secondary Keys months
    const spendingObject = {};
    allYears.forEach(year => spendingObject[year] = 0);
    // Fill Object by running through all transactions
    // Find Transactions per Year
    Object.keys(spendingObject).forEach(year =>{
      const yearlyTransactions = this.transactions.filter(transaction => transaction.year === parseInt(year, 10));
      // find months with spending data
      const activeMonths = _.uniq(yearlyTransactions.map(transaction => transaction.month));
      // create objects for them
      const monthObject = {};
      activeMonths.forEach(month => monthObject[month] =[]);
      spendingObject[year] = monthObject;
      // Insert spending by Month
      activeMonths.forEach(month =>
        yearlyTransactions
          .filter(transaction => transaction.month === parseInt(month, 10))
          .forEach(filteredTransaction => spendingObject[year][month].push(filteredTransaction))
      );
      // sort the transactions by Date
      activeMonths.forEach(month => spendingObject[year][month] = _.sortBy(spendingObject[year][month], 'date_Object'));
    });

    return spendingObject;
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
