const express = require('express');

const router = express.Router();

const fetchingExerciseSController = require('../controllers/fetching-exercise(s)');

const fetchingStretcheSController = require('../controllers/fetching-stretch(s)');


//Exercise Routes
router.get('/exercise/:exerciseId', fetchingExerciseSController.getExerciseById);

router.get('/chest/exercises', fetchingExerciseSController.getChestExercises);

router.get('/arm/exercises', fetchingExerciseSController.getArmExercises);

router.get('/leg/exercises', fetchingExerciseSController.getLegExercises);

router.get('/back/exercises', fetchingExerciseSController.getBackExercises);

router.get('/shoulder/exercises', fetchingExerciseSController.getShoulderExercises);

router.get('/abdominals/exercises', fetchingExerciseSController.getAbdominalsExercises);

router.get('/similar/exercises', fetchingExerciseSController.getSimilarExercises);



//Stretch Routes
router.get('/chest/stretches', fetchingStretcheSController.getChestStretches);

router.get('/arm/stretches', fetchingStretcheSController.getArmStretches);

router.get('/back/stretches', fetchingStretcheSController.getBackStretches);

router.get('/leg/stretches', fetchingStretcheSController.getLegStretches);

router.get('/shoulder/stretches', fetchingStretcheSController.getShloulderStretches);

router.get('/abdominals/stretches', fetchingStretcheSController.getAbdominalsExercises);



module.exports = router;