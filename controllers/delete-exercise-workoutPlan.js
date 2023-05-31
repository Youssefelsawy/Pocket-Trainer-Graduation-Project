exports.deleteChestExercise = (req, res, next) => {
    const exeId = req.body.exerciseId;
    req.user
    .removeChestFromWorkoutPlan(exeId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {console.log(err)});
  };
  
  
  exports.deleteBackExercise = (req, res, next) => {
    const exeId = req.body.exerciseId;
    req.user
    .removeBackFromWorkoutPlan(exeId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {console.log(err)});
  };

  exports.deleteLegExercise = (req, res, next) => {
    const exeId = req.body.exerciseId;
    req.user
    .removeLegFromWorkoutPlan(exeId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {console.log(err)});
  };

  exports.deleteArmExercise = (req, res, next) => {
    const exeId = req.body.exerciseId;
    req.user
    .removeArmFromWorkoutPlan(exeId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {console.log(err)});
  };

  exports.deleteShoulderExercise = (req, res, next) => {
    const exeId = req.body.exerciseId;
    req.user
    .removeShoulderFromWorkoutPlan(exeId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {console.log(err)});
  };