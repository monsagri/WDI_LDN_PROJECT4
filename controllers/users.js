const User = require('../models/User');

function showAllRoute(req, res, next) {
  // console.log('showRoute',req.params.id);
  User.find()
    .then(users => res.json(users))
    .catch(next);
}

function showRoute(req, res, next) {
  // console.log('showRoute',req.params.id);
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}

function updateRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function deleteRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}


module.exports = {
  showAll: showAllRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
