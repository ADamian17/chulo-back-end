const db = require('../models')

// // all Users
const showUsers = (req, res) => {
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
//  const update = (req, res) => {
//   db.User.findByIdAndUpdate(req.params.id, (err, foundUser) => {
//     if (err) console.log(err);

//     if (req.body.name) {
//       foundUser.name = req.body.name
//     }

//     if (req.body.email) {
//       foundUser.email = req.body.email
//     }

//     if (req.body.password) {
//       let updatedPassword = bcrypt.hashSync(req.body.password, 10);
//       foundUser.password = updatedPassword;
//     }

//     foundUser.save( (err, updatedUser) => {
//       if (err) { res.json({ status: 400, message: 'Unable to Update', 
//           err, requestedAt: new Date().toLocaleString()
//       });
//     }
//     res.json({
//       status: 200,
//       data: updatedUser,
//       requestedAt: new Date().toLocaleString()
//     });
//    });
//   });
//  };
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
      })
    }
  )
}

module.exports = {
  showUsers,
  profile,
  update,
  destroy,
};