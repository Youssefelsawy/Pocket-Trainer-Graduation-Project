const Exercise = require('../models/exercise');

exports.getChestStretches = (req, res, next) => {
  Exercise.find({'Type': 'Stretching', "BodyPart": "Chest"})
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };
 
  exports.getArmStretches = (req, res, next) => {
    Exercise.find({'Type': 'Stretching', "BodyPart": {$in: ["Triceps", 'Biceps', 'Forearms']}})
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };


  exports.getBackStretches = (req, res, next) => {
    Exercise.find({'Type': 'Stretching', 'BodyPart': {$in: ['Lats', 'Lower Back', 'Middle Back']} })
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };

  exports.getLegStretches = (req, res, next) => {
    Exercise.find({'BodyPart': {$in: ['Adductors', 'Calves', 'Glutes', 'Hamstrings', 'Quadriceps']} })
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };

  exports.getShloulderStretches = (req, res, next) => {
    Exercise.find({'Type': 'Stretching', 'BodyPart': {$in: ['Shoulder', 'Neck', 'Traps']} })
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };

  exports.getAbdominalsExercises = (req, res, next) => {
    Exercise.find({'Type': 'Stretching', 'BodyPart': 'Abdominals'})
    
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };