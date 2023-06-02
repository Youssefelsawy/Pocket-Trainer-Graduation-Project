const Exercise = require('../models/exercise')

exports.addChestExercise = (req, res, next) => {
const exeId = req.body.exerciseId
    Exercise.findById(exeId)
    .then(exercise => {
        return req.user.addToChestDay(exercise)
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