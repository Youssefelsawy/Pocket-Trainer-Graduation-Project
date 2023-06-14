const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// const upload = multer({
//     storage: multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//       },
//       filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//       }
//     })
//   });


const fetchingMealSController = require('../controllers/fetching-meal(s)')

const WorkoutPlan = require('../controllers/WorkoutPlan');

const deleteExerciseFromWorkoutPlan = require('../controllers/delete-exercise-workoutPlan');

const addingExerciseToWorkoutPlan = require('../controllers/adding-exercise-workoutplan')

const userProfile = require('../controllers/profile')

const isAuth = require('../middleware/is-auth');

const router = express.Router();


router.post('/wourkoutplan-recommendation',isAuth, WorkoutPlan.RecomendWorkoutPlan);

router.get('/workoutplan',isAuth, WorkoutPlan.getWorkoutPlan);

router.delete('/wourkoutplan/delete/exercise',isAuth, deleteExerciseFromWorkoutPlan.deleteExercise);

router.post('/workoutplan/add/chest/exercise/:exerciseId', isAuth, addingExerciseToWorkoutPlan.addChestExercise)

router.post('/workoutplan/add/back/exercise/:exerciseId', isAuth, addingExerciseToWorkoutPlan.addBackExercise)

router.post('/workoutplan/add/arm/exercise/:exerciseId', isAuth, addingExerciseToWorkoutPlan.addArmExercise)

router.post('/workoutplan/add/leg/exercise/:exerciseId', isAuth, addingExerciseToWorkoutPlan.addLegExercise)

router.post('/workoutplan/add/shoulder/exercise/:exerciseId', isAuth, addingExerciseToWorkoutPlan.addShoulderExercise)

router.patch('/replace/exercise', isAuth, WorkoutPlan.ReplaceExercise)



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



// profile
router.put('/edit/profile', isAuth, upload.single('photo'), userProfile.editProfile);

router.delete('/delete/profile', isAuth, userProfile.deleteProfile)

router.patch('/delete/profile/photo', isAuth, userProfile.deletePhoto)

router.patch('/forget/password', userProfile.forgotPassword)

module.exports = router;
