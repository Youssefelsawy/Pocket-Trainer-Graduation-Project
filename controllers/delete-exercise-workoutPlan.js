exports.deleteExercise = (req, res, next) => {
  const exerciseId = req.body.exerciseId;
  req.user
    .removeExerciseFromWorkoutPlan(exerciseId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
};
