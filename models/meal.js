const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meal_Schema = new Schema({
  Food_items: {
    type: String,
    required: true
  },
  Breakfast: {
    type: Number,
    required: true
  },
  Lunch: {
    type: Number,
    required: true
  },
  Dinner: {
    type: Number,
    required: true
  },
  VegNovVeg: {
    type: Number,
    required: true
  },
  Calories: {
    type: Number,
    required: true
  },
  Fats: {
    type: Number,
    required: true
  },
  Proteins: {
    type: Number,
    required: true
  },
  Iron: {
    type: Number,
    required: true
  },
  Calcium: {
    type: Number,
    required: true
  },
  Sodium: {
    type: Number,
    required: true
  },
  Potassium: {
    type: Number,
    required: true
  },
  Carbohydrates: {
    type: Number,
    required: true
  },
  Fibre: {
    type: Number,
    required: true
  },
  VitaminD: {
    type: Number,
    required: true
  },
  Sugars: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  Ingredients: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Meal', meal_Schema);