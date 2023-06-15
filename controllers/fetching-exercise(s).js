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

exports.getExerciseById = async (req, res, next) => {
  try {
    const exercise = await Exercise.findOne(req.params.exerciseName);
    if (!exercise) {
      return res.status(404).send("Exercise not found");
    }
    res.send(exercise);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

exports.getSimilarExercises = async (req, res, next) => {
  const exercise = await Exercise.findOne(req.params.exerciseName);

  try {
    if(exercise) {
      await Exercise.find({"BodyPart": exercise.BodyPart})
      .then(exercises => {
        res.send(exercises);
      })
    } else if(!exercise) {
      res.json({message: "exercise not found"})
    }
  } catch {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};




