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

function getAllTransactionsRoute(req, res, next) {
  User.findById(req.params.userId)
    .then(user => res.json(user.transactions))
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
      res.json(user.transactions);
    })
    .catch(next);
}

function getOneTransactionRoute(req, res, next) {
  User.findById(req.params.userId)
    .then(user => {
      const transaction = user.transactions.id(req.params.transactionId);
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
      res.json(editedTransaction);
    })
    .catch(next);
}

function deleteTransactionRoute(req, res, next) {
  User.findById(req.params.userId)
    .then(user => {
      const transaction = user.transactions.id(req.params.transactionId);
      transaction.remove();
      res.json(user.transactions);
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
  deleteTransaction: deleteTransactionRoute
};
