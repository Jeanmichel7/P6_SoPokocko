const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//route signup
router.post('/signup', userCtrl.signup);
//route login
router.post('/login', userCtrl.login);

module.exports = router;