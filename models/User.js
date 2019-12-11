const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Name is required'],
  },
  last_name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  birthday: {
    type: String,
    required: [true, 'Password is required'],
  },
  free_plan: {
    type: Boolean,
    default: true,
  },
  my_movies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  }],
  payment: {
    first_name: {type: String},
    last_name: {type: String},
    card_num: {type: String},
    exp_year: {type: String},
    exp_month: {type: String},
    code: {type: String},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;