const Exercise = require('../models/exercise');


exports.getChestExercises = (req, res, next) => {
  Exercise.find({'BodyPart': 'Chest'})
  
  .then(exercises => {
    res.send(exercises);
  })
  .catch(err => console.log(err));
};

exports.getArmExercises = (req, res, next) => {
  Exercise.find({'BodyPart': {$in: ['Triceps', 'Biceps', 'Forearms']} })
  .then(exercises => {
    res.send(exercises);
  })
  .catch(err => console.log(err));
};


exports.getLegExercises = (req, res, next) => {
  Exercise.find({'BodyPart': {$in: ['Adductors', 'Calves', 'Glutes', 'Hamstrings', 'Quadriceps']} })
  
  .then(exercises => {
    res.send(exercises);
  })
  .catch(err => console.log(err));
};

exports.getBackExercises = (req, res, next) => {
  Exercise.find({'BodyPart': {$in: ['Lats', 'Lower Back', 'Middle Back']} })
  
  .then(exercises => {
    res.send(exercises);
  })
  .catch(err => console.log(err));
};

exports.getShoulderExercises = (req, res, next) => {
  Exercise.find({'BodyPart': {$in: ['Shoulder', 'Neck', 'Traps']} })
  
  .then(exercises => {
    res.send(exercises);
  })
  .catch(err => console.log(err));
};

exports.getAbdominalsExercises = (req, res, next) => {
  Exercise.find({'BodyPart': 'Abdominals'})
  
  .then(exercises => {
    res.send(exercises);
  })
  .catch(err => console.log(err));
};


exports.getWorkoutPlan = (req, res, next) => {
  req.user
  .populate()
  .then(user => {
    res.send(user.workoutPlan);
  })
};


// const exerciseId = req.params.exerciseId;
// Exercise.findById(exerciseId)
// .then(exercise => {
//   return req.user.addToWorkoutPlan(exercise);
// }).then(result => {
//   if (exist) {
//     res.send('this exercise already added in your workoutPlan');
//   }else {
//     console.log(result);
//     res.send(result);
//   }
// });
// exist = false;

