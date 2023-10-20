const express = require('express');
const { Authenticate, RefreshToken, Logout } = require('../controllers/authController');
const { Register } = require('../controllers/registerController');
const router = express.Router();


router.route('/')
.post(Authenticate)


router.route('/reg')
.post(Register)


router.route('/refresh')
.post(RefreshToken)

router.route('/logout')
.delete(Logout)



module.exports = router;