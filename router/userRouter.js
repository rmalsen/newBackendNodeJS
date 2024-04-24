const express = require('express');
const { registerUser, loginUser} = require('../service/userService')
const router = express.Router();



router.post('/register', registerUser)
router.post('/login', loginUser)


module.exports = router;