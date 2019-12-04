const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

// User Routes
router.get('/', ctrl.movies.index);
router.post('/new_movie', ctrl.movies.createMovie);
router.get('/:id', ctrl.movies.movieDetails);
router.put('/:id', ctrl.movies.movieUpdate);
router.delete('/:id', ctrl.movies.movieDelete)



module.exports = router;