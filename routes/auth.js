const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

// routes
router.post('/register', ctrl.auth.register);


module.exports = router;