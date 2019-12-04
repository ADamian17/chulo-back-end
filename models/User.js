const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
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
    default: false,
  },
  // my_movies: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Movies',
  // }],
  // payment: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Payment',
  //  required: [true, 'Payment is required'],
  // }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;