const User = require('../models/User');

function showAllRoute(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(next);
}

function showRoute(req, res, next) {
  User.findById(req.params.userId)
    .then(user => res.json(user))
    .catch(next);
}

function updateRoute(req, res, next) {
  User.findById(req.params.userId)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function deleteRoute(req, res, next) {
  User.findById(req.params.userId)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function showBudgetRoute(req,res,next) {
  User.findById(req.params.userId)
    .then( user => res.json(user))
    .catch(next);
}

function addBudgetCategoryRoute(req,res,next) {
  User.findById(req.params.userId)
    .then( user => {
      user.categories.push(req.body.category);
      user.save();
      res.json(user);
    })
    .catch(next);
}

function editBudgetRoute(req,res,next) {
  User.findById(req.params.userId)
    .then(user => {
      console.log('old budget', user.budget, 'new budget', req.body);
      user.budget = req.body;
      user.save();
      res.json(user);
    })
    .catch(next);
}

function deleteBudgetCategoryRoute(req,res,next) {
  User.findById(req.params.userId)
    .then( user => {
      const index = user.categories.indexOf(req.body.category);
      console.log(index);
      user.categories.splice(index, 1);
      user.save();
      res.json(user.categories);
    })
    .catch(next);
}


function getAllTransactionsRoute(req, res, next) {
  User.findById(req.params.userId)
    .then(user => res.json(user.transactionsByMonth))
    .catch(next);
}

function createTransactionRoute(req, res, next) {
  console.log(req.params.id);
  User.findById(req.params.userId)
    .then(user => {
      console.log(user);
      const newTransaction = req.body;
      user.transactions.push(newTransaction);
      user.save();
      res.json(user.transactionsByMonth);
    })
    .catch(next);
}

function getOneTransactionRoute(req, res, next) {
  console.log(req.params);
  User.findById(req.params.userId)
    .then(user => {
      const transaction = user.transactions.id(req.params.transactionId);
      console.log(transaction);
      res.json(transaction);
    })
    .catch(next);
}

function editTransactionRoute(req, res, next) {
  User.findById(req.params.userId)
    .then(user => {
      const editedTransaction = Object.assign(user.transactions.id(req.params.transactionId), req.body);
      const transaction = user.transactions.id(req.params.transactionId);
      transaction.remove();
      user.transactions.push(editedTransaction);
      user.save();
      res.json(user.transactionsByMonth);
    })
    .catch(next);
}

function deleteTransactionRoute(req, res, next) {
  console.log(req.params);
  User.findById(req.params.userId)
    .then(user => {
      const transaction = user.transactions.id(req.params.transactionId);
      console.log('transaction found is', transaction);
      transaction.remove();
      user.save();
      res.json(user.transactionsByMonth);
    })
    .catch(next);
}


module.exports = {
  showAll: showAllRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  getAllTransactions: getAllTransactionsRoute,
  newTransaction: createTransactionRoute,
  getOneTransaction: getOneTransactionRoute,
  editTransaction: editTransactionRoute,
  deleteTransaction: deleteTransactionRoute,
  showBudget: showBudgetRoute,
  editBudget: editBudgetRoute,
  addBudgetCategory: addBudgetCategoryRoute,
  removeBudgetCategory: deleteBudgetCategoryRoute
};
