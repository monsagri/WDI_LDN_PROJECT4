const router = require('express').Router();

const users = require('../controllers/users');
const auth = require('../controllers/auth');

const secureRoute = require('../lib/secureRoute');

router.route('/users')
  .get(secureRoute, users.showAll);

router.route('/users/:userId')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

router.route('/users/:userId/budget')
  .get(secureRoute, users.showBudget)
  .post(secureRoute, users.addBudgetCategory)
  .put(secureRoute, users.editBudget)
  .delete(secureRoute, users.removeBudgetCategory);

router.route('/users/:userId/transactions')
  .get(secureRoute, users.getAllTransactions)
  .post(secureRoute, users.newTransaction);

router.route('/users/:userId/transactions/bulk')
  .post(secureRoute, users.csvUpload);


router.route('/users/:userId/transaction/:transactionId')
  .get(secureRoute, users.getOneTransaction)
  .delete(secureRoute, users.deleteTransaction);

router.route('/users/:userId/transaction/:transactionId/edit')
  .get(secureRoute, users.getOneTransaction)
  .put(secureRoute, users.editTransaction);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);


router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
