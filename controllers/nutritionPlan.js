const axios = require('axios');
const CircularJSON = require('circular-json');
const Meal = require('../models/meal');


exports.RecommendNutritionPlan = async (req, res, next) => {
  const requestData = {
    age: req.body.age,
    veg_non_veg: req.body.veg_non_veg,
    weight: req.body.weight,
    height: req.body.height,
    goal: req.body.goal
  };
  console.log(requestData);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  try {
    const response = await axios.post('https://diet-model.onrender.com/predict', requestData, { headers });
    const diet_type = CircularJSON.stringify(response.data.diet_type);
    const foodItems = response.data.food_items;
    let meals = [];

    for (const foodItem of foodItems) {
      const meal = await Meal.findOne({ "Food_items": foodItem });
      meals.push(meal);
    }
    req.user.addMealsToNutritionPlan(meals)
    .then(result => {
      res.send(result);
    })
  } catch (error) {
    console.error(error);
    // Handle the error
  }
};
