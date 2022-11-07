const express = require('express');

const path = require('path');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getRequest);

router.get('/products', adminController.getProducts);

router.post('/add-product',adminController.postRequest);

module.exports = router;