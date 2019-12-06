const db = require('../models');
const bcrypt = require('bcryptjs');

// // all Users
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

// SHow One User
const profile = (req, res) => {
  db.User.findById(req.params.id)
    .populate('my_movies')
    .exec((err, foundProfile) => {
      if (err) return res.status(500).json({
        status: 500,
        data: foundProfile,
        error: [{ message: 'Something went wrong. Please try again '}],
      });
      return res.status(200).json({
        status: 200,
        data: foundProfile,
        requestedAt: new Date().toLocaleString(),
      }); 
    });
};

// Update User
const update = (req, res) => {
  db.User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}, (err, updatedUser) => {
      if (err)  return res.status(500).json({
        status: 500,
        error: [{message: 'Something went wrong. Please try again'}],
      });
      res.json({
        status: 200,
        count: 1,
        data: updatedUser,
        requestedAt: new Date().toLocaleString()
      });
    });
};

// Add Movie
const addMovie = (req,res) => {
  const movie = req.params.movieId;
  db.User.findById(req.params.id, (err, foundUser) =>{
      if (err) return res.status(500).json({
          status: 500,
          error: [{message: 'Uh oh, something went wrong. Please try again'}],
      });
      foundUser.my_movies.push(movie);
      foundUser.save((err, savedUser) => {
          if (err) return res.status(500).json({
              status: 500,
              error: [{message: 'Uh oh, something went wrong. Movie can not be added'}, err],
          });
          return res.status(201).json({
              status: 201,
              data: savedUser,
          }); 
      })
  });
}


 // Destroy user
const destroy = (req, res) => {
  db.User.findByIdAndDelete(
    req.params.id, 
    (err, deletedUser) =>{
      if (err)  return res.status(500).json({
        status: 500,
        error: [{message: 'Something went wrong! Please try again'}],
      });

      res.json({
        status:200,
        count: 1,
        data: deletedUser,
        requestedAt: new Date().toLocaleString(),
      });
    });
};

module.exports = {
  index,
  profile,
  update,
  addMovie,
  destroy,
};