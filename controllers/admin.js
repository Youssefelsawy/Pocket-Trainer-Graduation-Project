const Exercise = require('../models/exercise');
const Meal = require('../models/meal');
const Stretch = require('../models/stretch');


exports.postAddExercise = (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const bodyPart = req.body.bodyPart;
  const target = req.body.target;
  const description = req.body.description;
  const sets = req.body.sets;
  const repetition = req.body.repetition;
  const tips = req.body.tips;
  const exercise = new Exercise({
    name: name,
    bodyPart: bodyPart,
    target: target,
    description: description,
    sets: sets,
    repetition: repetition,
    tips: tips,
    imageUrl: imageUrl
  });
  exercise.save()
  .then(result => {
    console.log('exercise created');
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  })
};

exports.postAddMeal = (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const protein = req.body.protein;
  const fats = req.body.fats;
  const carbs = req.body.carbs;
  const calories = req.body.calories;
  const meal = new Meal({
    name: name,
    protein: protein,
    imageUrl: imageUrl,
    fats: fats,
    carbs: carbs,
    calories: calories,
  });
  meal.save()
  .then(result => {
    console.log('meal created');
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  })
};


exports.postAddStretch = (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const bodyPart = req.body.bodyPart;
  const duration = req.body.duration;
  const description = req.body.description;
  const stretch = new Stretch({
    name: name,
    bodyPart: bodyPart,
    duration: duration,
    imageUrl: imageUrl,
    description: description
  });
  stretch.save()
  .then(result => {
    console.log('stretch created');
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  })
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//   .then(product => {
//     if (!product) {
//       return res.redirect('/');
//     }
//     res.render('admin/edit-product', {
//       pageTitle: 'Edit Product',
//       path: '/admin/edit-product',
//       editing: editMode,
//       product: product
//     });
//   })
//   .catch(err => {console.log(err)})
// };

// exports.postEditProduct = (req, res, next) => {
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;
//   const updatedPrice = req.body.price;
//   const prodId = req.body.productId;
//   const updatedProduct = new Product(
//     updatedTitle,
//     updatedImageUrl,
//     updatedDesc,
//     updatedPrice,
//     prodId
//   );
//   updatedProduct.save()
//   .then(res.redirect('/admin/products'))
  
// };

// exports.getProducts = (req, res, next) => {
//   Product.fetchAll()
//     .then(products => {
//       res.render('admin/products', {
//         prods: products,
//         pageTitle: 'Admin Products',
//         path: '/admin/products'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.deleteById(prodId)
//   .then(result => {
//     res.redirect('/admin/products');
//   })
//   .catch(err => console.log(err))
// };
