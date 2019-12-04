const bcrypt = require('bcryptjs');
const db = require('../models');

// all Users
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

const showUser = (req, res) => {
  db.User.findById(req.params.userId)
    .populate('posts')
    .exec((err, foundUser) => {
    if (err) return res.status(500).json(err);
    res.json({
      status: 200,
      msg: "User detail",
      data: foundUser
    });
  });
};


module.exports = {
  index,
  register,
  login,
  showUser,
};