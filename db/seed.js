const db = require('../models');

const eventList = require('./classes.json');

db.Movies.remove({}, () => {
	eventList.forEach(movie => {
		db.Movies.create(movie, (error, createdMovie) => {
			if (error) return console.log(error);
			console.log(createdMovie);
		});
	});
});