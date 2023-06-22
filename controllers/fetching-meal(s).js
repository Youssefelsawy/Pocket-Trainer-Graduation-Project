const Meal = require('../models/meal');


// get all breakfast, lunch or dinner meals
exports.getSpecificMeals = (req, res) => {
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
  }else if (mealsType == 'dinner') {
    Meal.find( {'Dinner': 1} )
    .then(meals => {
      res.send(meals);
    })
    .catch(err => console.log(err));
  }
}

  exports.getMealById = (req, res) => {
    const mealId = req.params.mealId;
    Meal.findById(mealId)
      .then(meal => {
        if(!meal) {
          res.send('Meal not found')
        } 
        res.send(meal);
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Internal server error" });
      })
};
  

// add meal to user nutritiion plan
exports.postNutritionAddMeal = (req, res) => {
    const mealId = req.params.mealId;
    Meal.findById(mealId)
      .then(meal => {
        console.log(meal)
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

// delete meal from user nutrition plan
  exports.postNutritionDeleteMeal = (req, res) => {
    const mealId = req.params.mealId;
    req.user
      .removeFromNutritionPlan(mealId)
      .then(result => {
        res.send(result);
      })
      .catch(err => {console.log(err)});
};


// get specific meals from user Nutrition Plan
exports.getSpecificMealsFromNutritionPlan = (req, res) => {
  const mealsType = req.params.mealsType.toLowerCase();
  if( mealsType == "breakfast" ) {
    req.user
      .populate()
      .then(user => {
        const BreakfastMeals = user.NutritionPlan.Meals.filter(meal => {
          return meal.Breakfast == 1;
        })
        res.send(BreakfastMeals);
      })
  }
  else if( mealsType == "lunch" ) {
    req.user
    .populate()
    .then(user => {
      const LunchMeals = user.NutritionPlan.Meals.filter(meal => {
        return meal.Lunch == 1;
      })
      res.send(LunchMeals);
    })
  }
  else if( mealsType == "dinner" ) {
    req.user
    .populate()
    .then(user => {
      const DinnerMeals = user.NutritionPlan.Meals.filter(meal => {
        return meal.Dinner == 1;
      })
      res.send(DinnerMeals);
    })
  }
};