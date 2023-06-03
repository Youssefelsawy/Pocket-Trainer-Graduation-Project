const express = require('express');

const fetchingExerciseSController = require('../controllers/fetching-exercise(s)');

const fetchingMealSController = require('../controllers/fetching-meal(s)');

const fetchingStretcheSController = require('../controllers/fetching-stretch(s)');

const postWorkoutPlan = require('../controllers/WorkoutPlan-RecommendationSystem');

const deleteExerciseFromWorkoutPlan = require('../controllers/delete-exercise-workoutPlan');

const addingExerciseToWorkoutPlan = require('../controllers/adding-exercise-workoutplan')

const isAuth = require('../middleware/is-auth');

const router = express.Router();

//Exercise Routes
router.get('/exercise/:exerciseId', fetchingExerciseSController.getExerciseById);

router.get('/chest/exercises', fetchingExerciseSController.getChestExercises);

router.get('/arm/exercises', fetchingExerciseSController.getArmExercises);

router.get('/leg/exercises', fetchingExerciseSController.getLegExercises);

router.get('/back/exercises', fetchingExerciseSController.getBackExercises);

router.get('/shoulder/exercises', fetchingExerciseSController.getShoulderExercises);

router.get('/abdominals/exercises', fetchingExerciseSController.getAbdominalsExercises);

router.post('/wourkoutplan-recommendation',isAuth, postWorkoutPlan);

router.get('/workoutplan',isAuth, fetchingExerciseSController.getWorkoutPlan);

router.delete('/wourkoutplan/delete/exercise',isAuth, deleteExerciseFromWorkoutPlan.deleteExercise);

router.post('/workoutplan/add/chest/exercise/:exerciseId', isAuth, addingExerciseToWorkoutPlan.addChestExercise)

router.post('/workoutplan/add/back/exercise/:exerciseId', isAuth, addingExerciseToWorkoutPlan.addBackExercise)

router.post('/workoutplan/add/arm/exercise/:exerciseId', isAuth, addingExerciseToWorkoutPlan.addArmExercise)

router.post('/workoutplan/add/leg/exercise/:exerciseId', isAuth, addingExerciseToWorkoutPlan.addLegExercise)

router.post('/workoutplan/add/shoulder/exercise/:exerciseId', isAuth, addingExerciseToWorkoutPlan.addShoulderExercise)



//Meals Routes
router.get('/meals/breakfast', fetchingMealSController.getBreakfastMeals);

router.get('/meals/lunch', fetchingMealSController.getLunchMeals);

router.get('/meals/dinner', fetchingMealSController.getDinnerMeals);

router.get('/meal/:mealId', fetchingMealSController.getMealById);

router.post('/add-meal-to-nutritionPlan/:mealId', isAuth, fetchingMealSController.postNutritionAddMeal);

router.post('/delete-meal-from-nutritionPlan/:mealId', isAuth, fetchingMealSController.postNutritionDeleteMeal);

router.get('/nutritionplan/breakfast', isAuth, fetchingMealSController.getBreakfastInNutritionPlan);

router.get('/nutritionplan/lunch', isAuth, fetchingMealSController.getLunchInNutritionPlan);

router.get('/nutritionplan/dinner', isAuth, fetchingMealSController.getDinnerInNutritionPlan);


//Stretch Routes
router.get('/chest/stretches', fetchingStretcheSController.getChestStretches);

router.get('/arm/stretches', fetchingStretcheSController.getArmStretches);

router.get('/back/stretches', fetchingStretcheSController.getBackStretches);

router.get('/leg/stretches', fetchingStretcheSController.getLegStretches);

router.get('/shoulder/stretches', fetchingStretcheSController.getShloulderStretches);

router.get('/abdominals/stretches', fetchingStretcheSController.getAbdominalsExercises);


module.exports = router;
