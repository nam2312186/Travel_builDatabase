const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secretkey';

const generateToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: '1d' });

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });

module.exports = { generateToken, verifyToken };
