const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
// router.get('/add-product', adminController.getAddProduct);

// // /admin/products => GET
// router.get('/products', adminController.getProducts);

// /admin/add-exercise/meal => POST
router.post('/add-exercise', adminController.postAddExercise);

router.post('/add-meal', adminController.postAddMeal);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
