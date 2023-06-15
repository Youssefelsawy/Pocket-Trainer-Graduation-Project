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
    const exercise = await Exercise.findById(req.params.exerciseId);
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
  let Training_Location = req.params.training_location
  let goal = req.params.goal
  let level = req.params.level
  const exercise = await Exercise.findOne({"Title": req.params.exerciseName});

  if (Training_Location == "Home" && goal == "Bulk") {
    Exercise.find({ 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": exercise.BodyPart })
    .then(exercises => {
      res.send(exercises)
    })
  }

  else if(Training_Location == "Gym" && goal == "Bulk") {
    Exercise.find({ 'Equipment': {$ne: "Body Only"}, 'Type': "Strength", 'Level': level, "BodyPart": exercise.BodyPart })
    .then(exercises => {
      res.send(exercises)
    })
  }

  else if(Training_Location == "Home" && goal == "Cardio") {
    Exercise.find({ 'Equipment': "Body Only", 'Type': {$in: ["Cardio", "Plyometrics"]}, 'Level': level, "BodyPart": exercise.BodyPart })
    .then(exercises => {
      res.send(exercises)
    })
  }

  else if(Training_Location == "Gym" && goal == "Cardio") {
    Exercise.find({ 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": exercise.BodyPart })
    .then(exercises => {
      res.send(exercises)
    })
  }

  else if(Training_Location == "Home" && goal == "Cut") {
    Exercise.find({ 'Equipment': "Body Only", 'Type': {$in: ["Cardio", "Strength"]}, 'Level': level, "BodyPart": exercise.BodyPart })
    .then(exercises => {
      res.send(exercises)
    })
  }
  
  else if(Training_Location == "Gym" && goal == "Cut") {
    Exercise.find({ 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": exercise.BodyPart })
    .then(exercises => {
      res.send(exercises)
    })
  }
};




