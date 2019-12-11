const mongoose = require('mongoose');

const MoviesSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  year: {
    type: String,
    required: [true, 'year is required'],
  },
  img: {
    type: String,
    required: [true, 'Image is required'],
  },
  genre: [{
    type: String,
    required: [true, 'Category is required'],
  }],
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  movie_link: {
    type: String,
  },
  cast: [
    { 
      actor_name: {type: String,},
      actor_photo: {type: String},
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Movie = mongoose.model('Movie', MoviesSchema);

module.exports = Movie;