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

exports.getExerciseById = (req, res, next) => {
  const exeId = req.params.exerciseId;
  Exercise.findById(exeId)
  
  .then(exercise => {
    res.send(exercise);
  })
  .catch(err => console.log(err));
};

exports.getSimilarExercises = async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.exerciseId);
  Exercise.find({"BodyPart": exercise.BodyPart})
  .then(exercises => {
    res.send(exercises);
  }).catch(err => console.log(err))
};




