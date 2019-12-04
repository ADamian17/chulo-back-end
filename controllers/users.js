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
  db.User.findById( req.params.id, (err, foundProfile) => {
    if ( err ) return res,status(500).json({
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
  db.User.findById(
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
        const updatedUser = {
          name: req.body.name,
          email: req.body.email,
          password: hash,
          birthday: req.body.birthday,
        };
        db.User.findByIdAndUpdate(
          req.params.id,
          updatedUser,
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
      });
    })
  )
 
};


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
      })
    }
  )
}

module.exports = {
  index,
  profile,
  update,
  destroy,
};