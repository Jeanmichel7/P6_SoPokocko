const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//route login
router.post('/login', userCtrl.login);

//route signup
router.post('/signup', userCtrl.signup);


module.exports = router;