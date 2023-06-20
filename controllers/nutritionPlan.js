const axios = require('axios');
const CircularJSON = require('circular-json');


exports.RecommendNutritionPlan = (req, res, next) => {

    const requestData = {
        age: req.body.age,
        veg_non_veg: req.body.veg_non_veg,
        weight: req.body.weight,
        height: req.body.height,
        goal: req.body.goal
      };
      console.log(requestData)

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };

    axios.post('https://diet-model.onrender.com/predict', requestData, { headers })
      .then(response => {
        const serializedData = CircularJSON.stringify(response.data);
        const meals = [...serializedData[food_items]]
        res.send(meals)
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
}
