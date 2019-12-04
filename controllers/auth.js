const bcrypt = require('bcryptjs');
const db = require('../models');

// all users
const index = (req, res) => {
  db.User.find({}, (err, allUsers) => {
    if (err)  return res.status(500).json({
      status: 500,
      error: [{message: 'Something went wrong! Please try again'}],
    });
    
    res.json({
      status: 200,
      count: allUsers.length,
      data: allUsers,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

const register = (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.birthday 
  ) {
    return res.status(400).json({
      status: 400,
      message:
        "Please enter your name, email, password and birthday"
    });
  }
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {

    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again"
      });

    if (foundUser)
      res.status(400).json({
        status: 400,
        message: "Something went wrong. Please try again"
      });

    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again"
        });

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err)
          return res.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again"
          });
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: hash,
          birthday: req.body.birthday,
        };
        db.User.create(newUser, (err) => {
          if (err)
            return res.status(500).json({
              status: 500,
              message: "Something went wrong. Please try again"
            });
          res.status(201).json({ status: 201, message: "success" });
        });
      });
    });
  });
};


module.exports = {
  index,
  register,
};