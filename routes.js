const express = require('express');
const UserController = require('./userController');
const CustomerController = require('./customerController');

const router = express.Router();

// router.get('/', UserController.getUsers);
router.post('/login', UserController.loginUser);
router.post('/trackId', CustomerController.getTrackId);
router.post('/requestService', CustomerController.saveServiceRequest);
router.post('/requestPrice', CustomerController.savePriceOfferRequest);
router.post('/managerInfo', UserController.managerInfo);
router.post('/recepInfo', UserController.recepInfo);

module.exports = router;