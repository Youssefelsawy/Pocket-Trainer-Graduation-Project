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
  const training_location = req.user.ListOfRequirment.training_location
  const goal = req.user.ListOfRequirment.goal
  const level = req.user.ListOfRequirment.level
  const exercise = await Exercise.findOne({"Title": req.params.exerciseName});

  try{

    if (training_location == "Home" && goal == "Bulk") {
      Exercise.find({ 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": exercise.BodyPart })
      .then(exercises => {
        
        if( exercise.BodyPart == 'Chest' ) {
          const map = new Map();
          const chestExercises = req.user.workoutPlan.ChestDay;
          for(let i=0; i<chestExercises.length; i++) {
            map.set(chestExercises[i].exerciseId.toString(), i);
          }
          var similarChestExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarChestExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarChestExercises);
        }

        if( exercise.BodyPart == 'Middle Back' || exercise.BodyPart == 'Lower Back' || exercise.BodyPart == 'Lats' ) {
          const map = new Map();
          const BackExercises = req.user.workoutPlan.BackDay;
          for(let i=0; i<BackExercises.length; i++) {
            map.set(BackExercises[i].exerciseId.toString(), i);
          }
          var similarBackExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarBackExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarBackExercises);
        }

        if( exercise.BodyPart == 'Forearms' || exercise.BodyPart == 'Biceps' || exercise.BodyPart == 'Triceps' ) {
          const map = new Map();
          const ArmExercises = req.user.workoutPlan.ArmDay;
          for(let i=0; i<ArmExercises.length; i++) {
            map.set(ArmExercises[i].exerciseId.toString(), i);
          }
          var similarArmExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarArmExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarArmExercises);
        }

        if( exercise.BodyPart == 'Quadriceps' || exercise.BodyPart == 'Hamstrings' || exercise.BodyPart == 'Glutes' || exercise.BodyPart == 'Calves' || exercise.BodyPart == 'Adductors' ) {
          const map = new Map();
          const LegExercises = req.user.workoutPlan.LegDay;
          for(let i=0; i<LegExercises.length; i++) {
            map.set(LegExercises[i].exerciseId.toString(), i);
          }
          var similarChestExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarChestExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarChestExercises);
        }

        if( exercise.BodyPart == 'Shoulders' || exercise.BodyPart == 'Neck' || exercise.BodyPart == 'Traps' ) {
          const map = new Map();
          const ShoulderExercises = req.user.workoutPlan.ShoulderDay;
          for(let i=0; i<ShoulderExercises.length; i++) {
            map.set(ShoulderExercises[i].exerciseId.toString(), i);
          }
          var similarShoulderExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarShoulderExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarShoulderExercises);
        }

      })
    }



    else if(training_location == "Gym" && goal == "Bulk") {
      Exercise.find({ 'Equipment': {$ne: "Body Only"}, 'Type': "Strength", 'Level': level, "BodyPart": exercise.BodyPart })
      .then(exercises => {

        if( exercise.BodyPart == 'Chest' ) {
          const map = new Map();
          const chestExercises = req.user.workoutPlan.ChestDay;
          for(let i=0; i<chestExercises.length; i++) {
            map.set(chestExercises[i].exerciseId.toString(), i);
          }
          var similarChestExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarChestExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarChestExercises);
        }

        if( exercise.BodyPart == 'Middle Back' || exercise.BodyPart == 'Lower Back' || exercise.BodyPart == 'Lats' ) {
          const map = new Map();
          const BackExercises = req.user.workoutPlan.BackDay;
          for(let i=0; i<BackExercises.length; i++) {
            map.set(BackExercises[i].exerciseId.toString(), i);
          }
          var similarBackExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarBackExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarBackExercises);
        }

        if( exercise.BodyPart == 'Forearms' || exercise.BodyPart == 'Biceps' || exercise.BodyPart == 'Triceps' ) {
          const map = new Map();
          const ArmExercises = req.user.workoutPlan.ArmDay;
          for(let i=0; i<ArmExercises.length; i++) {
            map.set(ArmExercises[i].exerciseId.toString(), i);
          }
          var similarArmExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarArmExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarArmExercises);
        }

        if( exercise.BodyPart == 'Quadriceps' || exercise.BodyPart == 'Hamstrings' || exercise.BodyPart == 'Glutes' || exercise.BodyPart == 'Calves' || exercise.BodyPart == 'Adductors' ) {
          const map = new Map();
          const LegExercises = req.user.workoutPlan.LegDay;
          for(let i=0; i<LegExercises.length; i++) {
            map.set(LegExercises[i].exerciseId.toString(), i);
          }
          var similarChestExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarChestExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarChestExercises);
        }

        if( exercise.BodyPart == 'Shoulders' || exercise.BodyPart == 'Neck' || exercise.BodyPart == 'Traps' ) {
          const map = new Map();
          const ShoulderExercises = req.user.workoutPlan.ShoulderDay;
          for(let i=0; i<ShoulderExercises.length; i++) {
            map.set(ShoulderExercises[i].exerciseId.toString(), i);
          }
          var similarShoulderExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarShoulderExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarShoulderExercises);
        }
        
      })
    }


    else if(training_location == "Home" && goal == "Cardio") {
      Exercise.find({ 'Equipment': "Body Only", 'Type': {$in: ["Cardio", "Plyometrics"]}, 'Level': level, "BodyPart": exercise.BodyPart })
      .then(exercises => {

        if( exercise.BodyPart == 'Chest' ) {
          const map = new Map();
          const chestExercises = req.user.workoutPlan.ChestDay;
          for(let i=0; i<chestExercises.length; i++) {
            map.set(chestExercises[i].exerciseId.toString(), i);
          }
          var similarChestExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarChestExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarChestExercises);
        }

        if( exercise.BodyPart == 'Middle Back' || exercise.BodyPart == 'Lower Back' || exercise.BodyPart == 'Lats' ) {
          const map = new Map();
          const BackExercises = req.user.workoutPlan.BackDay;
          for(let i=0; i<BackExercises.length; i++) {
            map.set(BackExercises[i].exerciseId.toString(), i);
          }
          var similarBackExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarBackExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarBackExercises);
        }

        if( exercise.BodyPart == 'Forearms' || exercise.BodyPart == 'Biceps' || exercise.BodyPart == 'Triceps' ) {
          const map = new Map();
          const ArmExercises = req.user.workoutPlan.ArmDay;
          for(let i=0; i<ArmExercises.length; i++) {
            map.set(ArmExercises[i].exerciseId.toString(), i);
          }
          var similarArmExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarArmExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarArmExercises);
        }

        if( exercise.BodyPart == 'Quadriceps' || exercise.BodyPart == 'Hamstrings' || exercise.BodyPart == 'Glutes' || exercise.BodyPart == 'Calves' || exercise.BodyPart == 'Adductors' ) {
          const map = new Map();
          const LegExercises = req.user.workoutPlan.LegDay;
          for(let i=0; i<LegExercises.length; i++) {
            map.set(LegExercises[i].exerciseId.toString(), i);
          }
          var similarChestExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarChestExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarChestExercises);
        }

        if( exercise.BodyPart == 'Shoulders' || exercise.BodyPart == 'Neck' || exercise.BodyPart == 'Traps' ) {
          const map = new Map();
          const ShoulderExercises = req.user.workoutPlan.ShoulderDay;
          for(let i=0; i<ShoulderExercises.length; i++) {
            map.set(ShoulderExercises[i].exerciseId.toString(), i);
          }
          var similarShoulderExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarShoulderExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarShoulderExercises);
        }
        
      })
    }


    else if(training_location == "Gym" && goal == "Cardio") {
      Exercise.find({ 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": exercise.BodyPart })
      .then(exercises => {

        if( exercise.BodyPart == 'Chest' ) {
          const map = new Map();
          const chestExercises = req.user.workoutPlan.ChestDay;
          for(let i=0; i<chestExercises.length; i++) {
            map.set(chestExercises[i].exerciseId.toString(), i);
          }
          var similarChestExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarChestExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarChestExercises);
        }

        if( exercise.BodyPart == 'Middle Back' || exercise.BodyPart == 'Lower Back' || exercise.BodyPart == 'Lats' ) {
          const map = new Map();
          const BackExercises = req.user.workoutPlan.BackDay;
          for(let i=0; i<BackExercises.length; i++) {
            map.set(BackExercises[i].exerciseId.toString(), i);
          }
          var similarBackExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarBackExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarBackExercises);
        }

        if( exercise.BodyPart == 'Forearms' || exercise.BodyPart == 'Biceps' || exercise.BodyPart == 'Triceps' ) {
          const map = new Map();
          const ArmExercises = req.user.workoutPlan.ArmDay;
          for(let i=0; i<ArmExercises.length; i++) {
            map.set(ArmExercises[i].exerciseId.toString(), i);
          }
          var similarArmExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarArmExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarArmExercises);
        }

        if( exercise.BodyPart == 'Quadriceps' || exercise.BodyPart == 'Hamstrings' || exercise.BodyPart == 'Glutes' || exercise.BodyPart == 'Calves' || exercise.BodyPart == 'Adductors' ) {
          const map = new Map();
          const LegExercises = req.user.workoutPlan.LegDay;
          for(let i=0; i<LegExercises.length; i++) {
            map.set(LegExercises[i].exerciseId.toString(), i);
          }
          var similarChestExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarChestExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarChestExercises);
        }

        if( exercise.BodyPart == 'Shoulders' || exercise.BodyPart == 'Neck' || exercise.BodyPart == 'Traps' ) {
          const map = new Map();
          const ShoulderExercises = req.user.workoutPlan.ShoulderDay;
          for(let i=0; i<ShoulderExercises.length; i++) {
            map.set(ShoulderExercises[i].exerciseId.toString(), i);
          }
          var similarShoulderExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarShoulderExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarShoulderExercises);
        }
        
      })
    }


    else if(training_location == "Home" && goal == "Cut") {
      Exercise.find({ 'Equipment': "Body Only", 'Type': {$in: ["Cardio", "Strength"]}, 'Level': level, "BodyPart": exercise.BodyPart })
      .then(exercises => {

        if( exercise.BodyPart == 'Chest' ) {
          const map = new Map();
          const chestExercises = req.user.workoutPlan.ChestDay;
          for(let i=0; i<chestExercises.length; i++) {
            map.set(chestExercises[i].exerciseId.toString(), i);
          }
          var similarChestExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarChestExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarChestExercises);
        }

        if( exercise.BodyPart == 'Middle Back' || exercise.BodyPart == 'Lower Back' || exercise.BodyPart == 'Lats' ) {
          const map = new Map();
          const BackExercises = req.user.workoutPlan.BackDay;
          for(let i=0; i<BackExercises.length; i++) {
            map.set(BackExercises[i].exerciseId.toString(), i);
          }
          var similarBackExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarBackExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarBackExercises);
        }

        if( exercise.BodyPart == 'Forearms' || exercise.BodyPart == 'Biceps' || exercise.BodyPart == 'Triceps' ) {
          const map = new Map();
          const ArmExercises = req.user.workoutPlan.ArmDay;
          for(let i=0; i<ArmExercises.length; i++) {
            map.set(ArmExercises[i].exerciseId.toString(), i);
          }
          var similarArmExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarArmExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarArmExercises);
        }

        if( exercise.BodyPart == 'Quadriceps' || exercise.BodyPart == 'Hamstrings' || exercise.BodyPart == 'Glutes' || exercise.BodyPart == 'Calves' || exercise.BodyPart == 'Adductors' ) {
          const map = new Map();
          const LegExercises = req.user.workoutPlan.LegDay;
          for(let i=0; i<LegExercises.length; i++) {
            map.set(LegExercises[i].exerciseId.toString(), i);
          }
          var similarChestExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarChestExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarChestExercises);
        }

        if( exercise.BodyPart == 'Shoulders' || exercise.BodyPart == 'Neck' || exercise.BodyPart == 'Traps' ) {
          const map = new Map();
          const ShoulderExercises = req.user.workoutPlan.ShoulderDay;
          for(let i=0; i<ShoulderExercises.length; i++) {
            map.set(ShoulderExercises[i].exerciseId.toString(), i);
          }
          var similarShoulderExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarShoulderExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarShoulderExercises);
        }
        
      })
    }
    

    else if(training_location == "Gym" && goal == "Cut") {
      Exercise.find({ 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": exercise.BodyPart })
      .then(exercises => {

        if( exercise.BodyPart == 'Chest' ) {
          const map = new Map();
          const chestExercises = req.user.workoutPlan.ChestDay;
          for(let i=0; i<chestExercises.length; i++) {
            map.set(chestExercises[i].exerciseId.toString(), i);
          }
          var similarChestExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarChestExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarChestExercises);
        }

        if( exercise.BodyPart == 'Middle Back' || exercise.BodyPart == 'Lower Back' || exercise.BodyPart == 'Lats' ) {
          const map = new Map();
          const BackExercises = req.user.workoutPlan.BackDay;
          for(let i=0; i<BackExercises.length; i++) {
            map.set(BackExercises[i].exerciseId.toString(), i);
          }
          var similarBackExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarBackExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarBackExercises);
        }

        if( exercise.BodyPart == 'Forearms' || exercise.BodyPart == 'Biceps' || exercise.BodyPart == 'Triceps' ) {
          const map = new Map();
          const ArmExercises = req.user.workoutPlan.ArmDay;
          for(let i=0; i<ArmExercises.length; i++) {
            map.set(ArmExercises[i].exerciseId.toString(), i);
          }
          var similarArmExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarArmExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarArmExercises);
        }

        if( exercise.BodyPart == 'Quadriceps' || exercise.BodyPart == 'Hamstrings' || exercise.BodyPart == 'Glutes' || exercise.BodyPart == 'Calves' || exercise.BodyPart == 'Adductors' ) {
          const map = new Map();
          const LegExercises = req.user.workoutPlan.LegDay;
          for(let i=0; i<LegExercises.length; i++) {
            map.set(LegExercises[i].exerciseId.toString(), i);
          }
          var similarChestExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarChestExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarChestExercises);
        }

        if( exercise.BodyPart == 'Shoulders' || exercise.BodyPart == 'Neck' || exercise.BodyPart == 'Traps' ) {
          const map = new Map();
          const ShoulderExercises = req.user.workoutPlan.ShoulderDay;
          for(let i=0; i<ShoulderExercises.length; i++) {
            map.set(ShoulderExercises[i].exerciseId.toString(), i);
          }
          var similarShoulderExercises = [];
          for(let i=0; i<exercises.length; i++) {
            similarShoulderExercises = exercises.filter(exercise => {
              return !map.has(exercise._id.toString());
            });
          }
          res.send(similarShoulderExercises);
        }
        
      })
    }

  }catch {
    res.status(200).send('There is No Similar Exercises')
  }
}





