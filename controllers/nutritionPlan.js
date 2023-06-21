const axios = require('axios');
const CircularJSON = require('circular-json');
const Meal = require('../models/meal');


exports.RecommendNutritionPlan = async (req, res, next) => {
  
  // first taking attributes that will send to python model
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
    // send request to machine learning diet model with requestData
    const response = await axios.post('https://diet-model.onrender.com/predict', requestData, { headers });
    const diet_type = CircularJSON.stringify(response.data.diet_type);
    const foodItems = response.data.food_items;
    let meals = [];

    for (const foodItem of foodItems) {
      let meal = await Meal.findOne({ "Food_items": foodItem });
      meals.push(meal);
    }
    await req.user.CalculatingValueOfNutrients(meals)
    await req.user.addMealsToNutritionPlan(meals)
    res.json({message: 'success'})
  } catch (error) {
    console.log(error);
    res.status(200).json({message: "something happen try again"})
  }
};
