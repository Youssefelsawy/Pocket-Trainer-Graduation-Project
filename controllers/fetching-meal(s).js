const Meal = require('../models/meal');

exports.getSpecificMeals = (req, res, next) => {
  const mealsType = req.params.mealsType.toLowerCase();
  if(mealsType == 'breakfast') {
    Meal.find( {'Breakfast': 1} )
    .then(meals => {
      res.send(meals);
    })
    .catch(err => console.log(err));
  } else if(mealsType == 'lunch') {
    Meal.find( {'Lunch': 1} )
    .then(meals => {
      res.status(200).send(meals);
    })
    .catch(err => console.log(err));
  }else if (mealsType == 'Dinner') {
    Meal.find( {'Dinner': 1} )
    .then(meals => {
      res.send(meals);
    })
    .catch(err => console.log(err));
  }
}


  exports.getMealById = (req, res, next) => {
    const mealId = req.params.mealId;
    Meal.findById(mealId) 
      .then(meal => {
        res.send(meal);
      })
      .catch(err => console.log(err))
  };
  

  exports.postNutritionAddMeal = (req, res, next) => {
    const mealId = req.params.mealId;
    Meal.findById(mealId)
      .then(meal => {
        return req.user.addToNutritionPlan(meal);
      }).then(result => {
        if (exist) {
          res.send('this meal already added in your Nutrition Plan');
        }else {
          res.send(result);
        }
      });
      exist = false;
  };

  exports.postNutritionDeleteMeal = (req, res, next) => {
    const mealId = req.params.mealId;
    req.user
      .removeFromNutritionPlan(mealId)
      .then(result => {
        res.send(result);
      })
      .catch(err => {console.log(err)});
  };

  exports.getBreakfastInNutritionPlan = (req, res, next) => {
    req.user
      .populate()
      .then(user => {
        const BreakfastMeals = user.NutritionPlan.Meals.filter(meal => {
          return meal.Breakfast == 1;
        })
        res.send(BreakfastMeals);
      })
    };

  exports.getLunchInNutritionPlan = (req, res, next) => {
    req.user
      .populate()
      .then(user => {
        const LunchMeals = user.NutritionPlan.Meals.filter(meal => {
          return meal.Lunch == 1;
        })
        res.send(LunchMeals);
      })
    };

  exports.getDinnerInNutritionPlan = (req, res, next) => {
    req.user
      .populate()
      .then(user => {
        const DinnerMeals = user.NutritionPlan.Meals.filter(meal => {
          return meal.Dinner == 1;
        })
        res.send(DinnerMeals);
      })
    };