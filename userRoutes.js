const express = require('express');
const UserController = require('./userController');

const router = express.Router();

router.get('/', UserController.getUsers);
router.post('/login', UserController.loginUser);

module.exports = router;