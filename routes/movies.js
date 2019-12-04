const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

// User Routes
router.get('/', ctrl.movies.index);
router.post('/new_movies', ctrl.movies.createMovie);
// router.get('/:id', ctrl.movies.movieDetail);



module.exports = router;