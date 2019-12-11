const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.MONGO_URI;


mongoose.connect(dbUrl, {
  if ( proccess.env.NODE_ENV == "PRODUCTION" ) {
    mongoose.connect(process.env.MLAB_URL)
  } else {
     mongoose.connect("mongodb://localhost:27017/chulo")
  }
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected :)'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));



module.exports = {
  User: require('./User'),
  Movies: require('./Movies')
}