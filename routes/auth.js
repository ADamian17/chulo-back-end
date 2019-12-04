const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

// routes
router.get('/users', ctrl.auth.index);
router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.get("/verify", ctrl.auth.verify);
router.delete("/logout", ctrl.auth.logout);
// router.put("/:id", ctrl.auth.updateUser);
// router.get("/:id", ctrl.auth.userDetail);
// router.delete("/:id", ctrl.auth.destroy);


module.exports = router;