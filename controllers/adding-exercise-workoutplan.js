const Exercise = require('../models/exercise')

exports.addChestExercise = (req, res, next) => {
const exeId = req.body.exerciseId
Exercise.findOne({ _id: exeId })
  .then(exercise => {
    if (exercise) {
      return req.user.addToChestDay(exercise);
    } else {
      res.status(400).send("Exercise does not exist");
    }
  })
  .then(result => {
    if (exist) {
      res.status(200).send('This exercise is already added in your workoutPlan');
    } else {
      res.status(201).send(result);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).send("An error occurred");
  });

    exist = false;
};


exports.addBackExercise = (req, res, next) => {
    const exeId = req.body.exerciseId
        Exercise.findById(exeId)
        .then(exercise => {
            return req.user.addToBackDay(exercise)
        }).then(result => {
            if(exist) {
                res.status(200).send('this exercise already added in your workoutPlan');
            } else {
                res.status(201).send(result)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("Exercise you provide does not exist")
          });
        exist = false;
};


exports.addArmExercise = (req, res, next) => {
    const exeId = req.body.exerciseId
        Exercise.findById(exeId)
        .then(exercise => {
            return req.user.addToArmDay(exercise)
        }).then(result => {
            if(exist) {
                res.status(200).send('this exercise already added in your workoutPlan');
            } else {
                res.status(201).send(result)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("Exercise you provide does not exist")
            });
        exist = false;
};


exports.addLegExercise = (req, res, next) => {
    const exeId = req.body.exerciseId
        Exercise.findById(exeId)
        .then(exercise => {
            return req.user.addToLegDay(exercise)
        }).then(result => {
            if(exist) {
                res.status(200).send('this exercise already added in your workoutPlan');
            } else {
                res.status(201).send(result)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("Exercise you provide does not exist")
            });
        exist = false;
};


exports.addShoulderExercise = (req, res, next) => {
    const exeId = req.body.exerciseId
        Exercise.findById(exeId)
        .then(exercise => {
            return req.user.addToShoulderDay(exercise)
        }).then(result => {
            if(exist) {
                res.status(200).send('this exercise already added in your workoutPlan');
            } else {
                res.status(201).send(result)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("Exercise you provide does not exist")
            });
        exist = false;
};