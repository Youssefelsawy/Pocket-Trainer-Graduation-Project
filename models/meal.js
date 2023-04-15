const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meal_Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  protien: {
    type: String,
    required: true
  },
  calories: {
    type: String,
    required: true
  },
  fats: {
    type: String,
    required: true
  },
  carbs: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Meal', meal_Schema);