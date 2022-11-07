const express = require('express');

const path = require('path');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getindex);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.get('/products', shopController.getProduct)


module.exports = router;