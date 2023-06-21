exports.deleteExercise = async (req, res, next) => {
  // delete exercise from any day in Workout plan
  try {
    const exerciseId = req.body.exerciseId;
    const user = req.user;
    const result = await user.removeExerciseFromWorkoutPlan(exerciseId);
    res.status(200).json({
      message: "Exercise has been deleted from the workout plan.",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while deleting the exercise from the workout plan.",
      error: error,
    });
  }
};
