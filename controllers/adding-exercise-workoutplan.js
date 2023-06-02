const Exercise = require('../models/exercise')

exports.addChestExercise = (req, res, next) => {
const exeId = req.body.exercisesId
    Exercise.findById(exeId)
    .then(exercise => {
        return req.user.addToChestDay(exercise)
    }).then(result => {
        if(exist) {
            res.send('this exercise already added in your workoutPlan');
        } else {
            res.send(result)
        }
    })
    exist = false;
};