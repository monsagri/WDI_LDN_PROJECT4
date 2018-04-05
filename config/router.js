const router = require('express').Router();

const users = require('../controllers/users');

router.route('/users')
  .get(users.showAll);

router.route('/users/:userId')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/users/:userId/transactions')
  .get(users.getAllTransactions)
  .post(users.newTransaction);

router.route('/users/:userId/transactions/:transactionId')
  .get(users.getOneTransaction)
  .delete(users.deleteTransaction);

router.route('/users/:userId/transactions/:transactionId/edit')
  .get(users.getOneTransaction)
  .put(users.editTransaction);


router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
