const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

// routes
router.get('/users', ctrl.auth.index);
router.post('/register', ctrl.auth.register);


module.exports = router;