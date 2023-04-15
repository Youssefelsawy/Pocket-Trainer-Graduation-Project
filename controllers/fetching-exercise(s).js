const Exercise = require('../models/exercise');


exports.getChestExercises = (req, res, next) => {
  Exercise.find({'bodyPart': 'chest'})
  .select('name imageUrl bodyPart')
  .then(exercises => {
    res.send(exercises);
  })
  .catch(err => console.log(err));
};

exports.getArmExercises = (req, res, next) => {
  Exercise.find({'bodyPart': 'arm'})
  .select('name imageUrl bodyPart')
  .then(exercises => {
    res.send(exercises);
  })
  .catch(err => console.log(err));
};

exports.getLegExercises = (req, res, next) => {
  Exercise.find({'bodyPart': 'leg'})
  .select('name imageUrl bodyPart')
  .then(exercises => {
    res.send(exercises);
  })
  .catch(err => console.log(err));
};

exports.getBackExercises = (req, res, next) => {
  Exercise.find({'bodyPart': 'back'})
  .select('name imageUrl bodyPart')
  .then(exercises => {
    res.send(exercises);
  })
  .catch(err => console.log(err));
};

exports.getShoulderExercises = (req, res, next) => {
  Exercise.find({'bodyPart': 'shoulder'})
  .select('name imageUrl bodyPart')
  .then(exercises => {
    res.send(exercises);
  })
  .catch(err => console.log(err));
};

exports.getExerciseById = (req, res, next) => {
  const exerciseId = req.params.exerciseId;
  Exercise.findById(exerciseId) 
  .then(exercise => {
    res.send(exercise);
  })
  .catch(err => console.log(err))
};

exports.getWorkoutPlan = (req, res, next) => {
  req.user
  .populate()
  .then(user => {
    res.send(user.workoutPlan.Exercises);
  })
};

exports.postWorkoutPlan = (req, res, next) => {
  const exerciseId = req.params.exerciseId;
  Exercise.findById(exerciseId).select('name imageUrl bodyPart')
  .then(exercise => {
    return req.user.addToWorkoutPlan(exercise);
  }).then(result => {
    if (exist) {
      res.send('this exercise already added in your workoutPlan');
    }else {
      console.log(result);
      res.send(result);
    }
  });
  exist = false;
};


exports.postWorkoutDeleteExercise = (req, res, next) => {
  const exeId = req.params.exerciseId;
  req.user
  .removeFromWorkoutPlan(exeId)
  .then(result => {
    res.send(result);
  })
  .catch(err => {console.log(err)});
};
// let exercisesArr = [];
// let exercise = {};

// for (let e of exercises) {
//   exercise.name = e.name;
//   exercise.bodyPart = e.bodyPart;
//   exercise.imageUrl = e.imageUrl;
//   exercisesArr.push(exercise);
// }
// res.send(exercisesArr);
// exercisesArr = [];