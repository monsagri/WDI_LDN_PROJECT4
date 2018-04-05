const router = require('express').Router();

const users = require('../controllers/users');

router.route('/users')
  .get(users.showAll);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

// router.route('/users/:id/transactions')
//   .get(users.getTransaction)
//   .post(users.newTransaction)
//   .put(users.deleteTransaction)
//   .delete(users.deleteTransaction);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
