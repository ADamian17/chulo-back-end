const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.MONGODB_URI;



if ( process.env.NODE_ENV == "production" ) {
  mongoose.connect(process.env.MLAB_URL)
} else {
    mongoose.connect("mongodb://localhost:27017/chulo-movies",   
    {useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected :)'))
    .catch((err) => console.log(`MongoDB connection error: ${err}`));
  
}

module.exports = {
  User: require('./User'),
  Movies: require('./Movies')
}