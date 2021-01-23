const express = require('express');
const UserController = require('./userController');

const router = express.Router();

router.get('/', UserController.getUsers);
router.post('/login', UserController.loginUser);
//   .get('/:email', userAuthFunc, UserController.getUserByEmail)
//   .put('/:email', userAuthFunc, UserController.updateUser);
// router.get('/verify/:customer_id', userAuthFunc, UserController.verifyCustomerId);
// router.post('/updatePassword/:email', UserController.updateUserPassword);
// router.post('/integrations/slack/test/:customer_id', userAuthFunc, UserController.testSlackNotificationByCustomerId);

module.exports = router;