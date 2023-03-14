const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {prods: products, pageTitle: 'All products', path: '/products'});        
    })
}

exports.getCart = (req, res) => {
    res.render('shop/cart', {pageTitle: 'cart', path: '/cart'});
}

exports.getindex = (req, res) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {prods: products, pageTitle: 'Shop', path: '/'});        
    })
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {pageTitle: 'CheckOut', path: '/checkout'});
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', {pageTitle: 'Your Orders', path: '/orders'});
}

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
       res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
       });
    });
}