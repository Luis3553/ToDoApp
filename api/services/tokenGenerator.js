var jwt = require('jsonwebtoken');

function createToken(id) {
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    id: id
  }, 'secret');
  return token;
}

module.exports = { createToken };