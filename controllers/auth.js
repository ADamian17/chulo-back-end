const bcryptjs = require('bcryptjs');
const db = require('../models');


// Register
const register = (req, res) => {
  if (err) return res.status(500).json({ "status": 500, "message": err});
  res.status(201).json({ status: 201, message: 'success' });
}


module.exports = {
  register,
};