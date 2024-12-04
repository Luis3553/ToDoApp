var express = require('express');
var { createUser, getUserId } = require('../db/requests');
var { createToken } = require('../services/tokenGenerator');
var router = express.Router();
const bcrypt = require('bcrypt');


router.post('/register', function (req, res, next) {
  const userDetails = req.body;

  bcrypt.hash(userDetails.password, 10, (err, hash) => {
    if (err) return next(err);
    const account = {
      username: userDetails.username,
      email: userDetails.email,
      hash: hash
    };
    createUser('accounts', account, (err, result) => {
      if (err) return next(err);
      res.sendStatus(201);
    })
  });
});

router.post('/login', function (req, res, next) {
  const account = req.body;
  getUserId('accounts', account, (err, user) => {
    if (err) return next(err);
    bcrypt.compare(account.password, user.hash, (err, result) => {
      if (err) return next(err);
      if (!result) res.sendStatus(401);
      let token = createToken(user.id);
      res.send({ token: token });
    });
  });
});

module.exports = router;