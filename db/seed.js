const db = require('../models');

const movies = require('./movies.json');

db.Movies.remove({}, () => {
	movies.forEach(movie => {
		db.Movies.create(movie, (error, createdMovie) => {
			if (error) return console.log(error);
			console.log(createdMovie);
		});
	});
});