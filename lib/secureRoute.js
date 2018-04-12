const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/environment');
const User = require('../models/User');

function secureRoute(req, res, next) {
  // check if a token was sent
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });
  const token = req.headers.authorization.replace('Bearer ', '');
  // check whether it is a good token
  if (token.split('.').length !== 3 || token === 'undefined') return res.status(401).json({ message: 'Unauthorized' });
  // Check whether if the token is allowed on this server
  jwt.verifyAsync(token, secret)
    .then(payload => User.findById(payload.sub))
    .then(user => {
      if(!user) return res.status(401).json({ message: 'Unauthorized' });
      req.currentUser = user;
      next();
    })
    .catch(next);
}

module.exports = secureRoute;
