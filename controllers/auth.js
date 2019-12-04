const bcrypt = require('bcryptjs');
const db = require('../models');


// Create User
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

// Login
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ status: 400, message: "Please enter your email and password" });
  }

  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again."
      });
    if (!foundUser) {
      return res
        .status(400)
        .json({ status: 400, message: "Email or password is incorrect" });
    }
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again."
        });
      if (isMatch) {
        req.session.currentUser = { id: foundUser._id };
        return res
          .status(200)
          .json({ status: 200, message: "Success", data: foundUser._id });
      } else {
        return res
          .status(400)
          .json({ status: 400, message: "Username or password is incorrect" });
      }
    });
  });
};

// Verify
const verify = (req, res ) => {
  if ( !req.session.currentUser ) return res.status(401).json({ 
    message: 'Unauthorized'
  });
  res.status(200).json({
    status: 200,
    message: `Current user verify. User ID: ${req.session.currentUser}`
  });
};

// Logout 
const logout = (req, res) => {
  if (!req.session.currentUser) return res.status(401),json({ status: 401, message: 'Unauthorized'});
  req.session.destroy( (err) =>  {
    if (err) return res.status(500).json({status: 500, message: 'something went wrong. Please try again'});
    res.sendStatus(200);
  });
};



module.exports = {
  register,
  login,
  logout,
  verify,
};