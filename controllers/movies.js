const db = require('../models');

// all movies
// // all Users
const index = (req, res) => {
  db.Movies.find({}, (err, allUsers) => {
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

// create movie
const createMovie = (req, res) => {
   db.Movies.findOne(req.body, (err, foundMovie) =>{
     if (err) return res.status(500).json({
        status: 500,
        error: [{message: 'Something went wrong! Please try again'}],
    });

    if (foundMovie) return res.status(400).json({
          status: 400,
          error: [{message: 'Invalid Request. Please try again'}]
    });
     
        db.Movies.create(req.body, (err, createdMovie) =>{
          if (err) return res.status(500).json({
              status: 500,
              error: [{message: 'Something went wrong. Please try again'}]
          });

          res.status(201).json({
              status: 201,
              count: 1,
              data: createdMovie,
              requestedAt: new Date().toLocaleString(),
         });
     });
  });
};

// Movies details
const movieDetails = (req, res) => {
  db.Movies.findById( req.params.id, (err, foundMovie) => {
    if ( err ) return res,status(500).json({
      status: 500,
      data: foundMovie,
      error: [{ message: 'Something went wrong. Please try again '}],
    });
    return res.status(200).json({
      status: 200,
      data: foundMovie,
      requestedAt: new Date().toLocaleString(),
    }); 
  });
};

// Movie Update
const movieUpdate = (req, res) => {
  db.Movies.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}, (err, updatedMovie) => {
      if (err)  return res.status(500).json({
        status: 500,
        error: [{message: 'Something went wrong, Please try again'}],
      });
      res.json({
        status: 200,
        count: 1,
        data: updatedMovie,
        requestedAt: new Date().toLocaleString()
    });
  });
};


// Movie Delete
 const movieDelete = (req, res) => {
  db.Movies.findByIdAndDelete(
    req.params.id, 
    (err, deletedMovie) =>{
      if (err)  return res.status(500).json({
        status: 500,
        error: [{message: 'Something went wrong! Please try again'}],
      });

      res.json({
        status:200,
        count: 1,
        data: deletedMovie,
        requestedAt: new Date().toLocaleString(),
    });
  });
};

module.exports = {
index,
createMovie,
movieDetails,
movieUpdate,
movieDelete
}