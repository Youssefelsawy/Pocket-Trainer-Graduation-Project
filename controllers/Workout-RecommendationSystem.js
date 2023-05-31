const Exercise = require('../models/exercise');

module.exports = (req, res, next) => {
    let Training_Location = req.body.training_location
    let goal = req.body.goal
    let level = req.body.level
  
    if (Training_Location == "home" && goal == "bulk") { // Completed
      Exercise.aggregate([
        { $facet: {
            chest: [
              { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Chest" } },
              { $sample: { size: 6 } }
            ],
            stretching: [
              { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": "Chest" } },
              { $sample: { size: 3 } }
            ]
        } },
        { $project: {
            exercises: { $concatArrays: ["$stretching", "$chest"] }
        } },
        { $unwind: "$exercises" },
        { $replaceRoot: { newRoot: "$exercises" } }
      ])
        .then(exercises => {
          return req.user.addChestExercisesToWorkoutPlan(exercises);
        })
        .then(() => {
          return Exercise.aggregate([
            { $facet: {
              stretching: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Adductors", "Calves", "Quadriceps"]} } },
                  { $sample: { size: 3 } }
                ],
                adductors: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Adductors" } },
                  { $sample: { size: 1 } }
                ],
                calves: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Calves" } },
                  { $sample: { size: 2 } }
                ],
                glutes: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Glutes" } },
                  { $sample: { size: 1 } }
                ],
                hamstrings: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Hamstrings" } },
                  { $sample: { size: 1 } }
                ],
                quadriceps: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Quadriceps" } },
                  { $sample: { size: 2 } }
                ]
            } },
            { $project: {
                exercises: { $concatArrays: ["$stretching", "$adductors", "$calves", "$glutes", "$hamstrings", "$quadriceps"] }
            } },
            { $unwind: "$exercises" },
            { $replaceRoot: { newRoot: "$exercises" } }
          ])
          
            .then(exercises => {
              return req.user.addLegExercisesToWorkoutPlan(exercises);
            })
        })
        .then(() => {
          return Exercise.aggregate([
            { $facet: {
              stretching: [
                { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Triceps", "Biceps", "Forearms"]} } },
                { $sample: { size: 3 } }
              ],
                triceps: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Triceps" } },
                  { $sample: { size: 3 } }
                ],
                biceps: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Biceps" } },
                  { $sample: { size: 3 } }
                ],
                forearms: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Forearms" } },
                  { $sample: { size: 1 } }
                ]
            } },
            { $project: {
                exercises: { $concatArrays: ["$stretching", "$triceps", "$biceps", "$forearms"] }
            } },
            { $unwind: "$exercises" },
            { $replaceRoot: { newRoot: "$exercises" } }
          ])     
            .then(exercises => {
              return req.user.addArmExercisesToWorkoutPlan(exercises);
            })
        })
        .then(() => {
          return Exercise.aggregate([
            { $facet: {
              stretching: [
                { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Lats", "Lower Back", "Middle Back"]} } },
                { $sample: { size: 3 } }
              ],
                lats: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Lats" } },
                  { $sample: { size: 2 } }
                ],
                lowerBack: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Lower Back" } },
                  { $sample: { size: 2 } }
                ],
                middleBack: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Middle Back" } },
                  { $sample: { size: 2 } }
                ]
            } },
            { $project: {
                exercises: { $concatArrays: ["$stretching", "$lats", "$lowerBack", "$middleBack"] }
            } },
            { $unwind: "$exercises" },
            { $replaceRoot: { newRoot: "$exercises" } }
          ])
            .then(exercises => {
              return req.user.addBackExercisesToWorkoutPlan(exercises);
            })
        })
        .then(() => {
          return Exercise.aggregate([
            { $facet: {
              stretching: [
                { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Shoulders", "Neck", "Traps"]} } },
                { $sample: { size: 3 } }
              ],
                shoulders: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Shoulders" } },
                  { $sample: { size: 5 } }
                ],
                neck: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Neck" } },
                  { $sample: { size: 1 } }
                ],
                traps: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Strength", 'Level': level, "BodyPart": "Traps" } },
                  { $sample: { size: 1 } }
                ]
            } },
            { $project: {
                exercises: { $concatArrays: ["$stretching", "$shoulders", "$neck", "$traps"] }
            } },
            { $unwind: "$exercises" },
            { $replaceRoot: { newRoot: "$exercises" } }
          ])
            .then(exercises => {
              return req.user.addShoulderExercisesToWorkoutPlan(exercises);
            })
        })
        .then(() => {
          res.send(req.user.workoutPlan);
        })
        .catch(err => {
          console.error(err);
          res.status(500).send("Error adding exercises to workout plan");
        });
    } 
    
  
  
    else if(Training_Location == "gym" && goal == "bulk") { // Completed
      Exercise.aggregate([
        { $facet: {
            chest: [
              { $match: { 'Equipment': {$ne: "Body Only"}, 'Type': "Strength", 'Level': level, "BodyPart": "Chest" } },
              { $sample: { size: 6 } }
            ],
            stretching: [
              { $match: { 'Type': "Stretching", 'Level': level, "BodyPart": "Chest" } },
              { $sample: { size: 3 } }
            ]
        } },
        { $project: {
            exercises: { $concatArrays: ["$stretching", "$chest"] }
        } },
        { $unwind: "$exercises" },
        { $replaceRoot: { newRoot: "$exercises" } }
      ])
        .then(exercises => {
          return req.user.addChestExercisesToWorkoutPlan(exercises);
        })
        .then(() => {
          return Exercise.aggregate([
            { $facet: {
                adductors: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Adductors" } },
                  { $sample: { size: 1 } }
                ],
                calves: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Calves" } },
                  { $sample: { size: 2 } }
                ],
                glutes: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Glutes" } },
                  { $sample: { size: 1 } }
                ],
                hamstrings: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Hamstrings" } },
                  { $sample: { size: 1 } }
                ],
                quadriceps: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Quadriceps" } },
                  { $sample: { size: 2 } }
                ],
                stretching: [
                  { $match: { 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Adductors", "Calves", "Quadriceps"]} } },
                  { $sample: { size: 3 } }
                ]
            } },
            { $project: {
                exercises: { $concatArrays: ["$stretching", "$adductors", "$calves", "$glutes", "$hamstrings", "$quadriceps"] }
            } },
            { $unwind: "$exercises" },
            { $replaceRoot: { newRoot: "$exercises" } }
          ])
          
            .then(exercises => {
              return req.user.addLegExercisesToWorkoutPlan(exercises);
            })
        })
        .then(() => {
          return Exercise.aggregate([
            { $facet: {
                triceps: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Triceps" } },
                  { $sample: { size: 3 } }
                ],
                biceps: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Biceps" } },
                  { $sample: { size: 3 } }
                ],
                forearms: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Forearms" } },
                  { $sample: { size: 1 } }
                ],
                stretching: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Triceps", "Biceps", "Forearms"]} } },
                  { $sample: { size: 3 } }
                ]
            } },
            { $project: {
                exercises: { $concatArrays: ["$stretching", "$triceps", "$biceps", "$forearms"] }
            } },
            { $unwind: "$exercises" },
            { $replaceRoot: { newRoot: "$exercises" } }
          ])        
            .then(exercises => {
              return req.user.addArmExercisesToWorkoutPlan(exercises);
            })
        })
        .then(() => {
          return Exercise.aggregate([
            { $facet: {
                lats: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Lats" } },
                  { $sample: { size: 2 } }
                ],
                lowerBack: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Lower Back" } },
                  { $sample: { size: 2 } }
                ],
                middleBack: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Middle Back" } },
                  { $sample: { size: 2 } }
                ],
                stretching: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Lats", "Lower Back", "Middle Back"]} } },
                  { $sample: { size: 3 } }
                ]
            } },
            { $project: {
                exercises: { $concatArrays: ["$stretching", "$lats", "$lowerBack", "$middleBack"] }
            } },
            { $unwind: "$exercises" },
            { $replaceRoot: { newRoot: "$exercises" } }
          ])        
            .then(exercises => {
              return req.user.addBackExercisesToWorkoutPlan(exercises);
            })
        })
        .then(() => {
          return Exercise.aggregate([
            { $facet: {
                shoulders: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Shoulders" } },
                  { $sample: { size: 5 } }
                ],
                neck: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Neck" } },
                  { $sample: { size: 1 } }
                ],
                traps: [
                  { $match: { 'Equipment': { $ne: "Body Only" }, 'Type': "Strength", 'Level': level, "BodyPart": "Traps" } },
                  { $sample: { size: 1 } }
                ],
                stretching: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Shoulders", "Neck", "Traps"]} } },
                  { $sample: { size: 3 } }
                ]
            } },
            { $project: {
                exercises: { $concatArrays: ["$stretching", "$shoulders", "$neck", "$traps"] }
            } },
            { $unwind: "$exercises" },
            { $replaceRoot: { newRoot: "$exercises" } }
          ])
                
            .then(exercises => {
              return req.user.addShoulderExercisesToWorkoutPlan(exercises);
            })
        })
        .then(() => {
          res.send(req.user.workoutPlan);
        })
        .catch(err => {
          console.error(err);
          res.status(500).send("Error adding exercises to workout plan");
        });     
    } 
    
  
  
    else if(Training_Location == "home" && goal == "cardio") { // Completed
      Exercise.aggregate([
        { $facet: {
            chest: [
              { $match: { 'Equipment': "Body Only", 'Type': {$in: ["Cardio", "Plyometrics"]}, 'Level': level, "BodyPart": "Chest" } },
              { $sample: { size: 6 } }
            ],
            stretching: [
              { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": "Chest" } },
              { $sample: { size: 3 } }
            ]
        } },
        { $project: {
            exercises: { $concatArrays: ["$stretching", "$chest"] }
        } },
        { $unwind: "$exercises" },
        { $replaceRoot: { newRoot: "$exercises" } }
      ])
      .then(exercises => {
        return req.user.addChestExercisesToWorkoutPlan(exercises);
      }) 
        .then(() => {
          return Exercise.aggregate([
            { $facet: {
                adductors: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Adductors" } },
                  { $sample: { size: 1 } }
                ],
                calves: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Calves" } },
                  { $sample: { size: 2 } }
                ],
                glutes: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Glutes" } },
                  { $sample: { size: 1 } }
                ],
                hamstrings: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Hamstrings" } },
                  { $sample: { size: 1 } }
                ],
                quadriceps: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Quadriceps" } },
                  { $sample: { size: 2 } }
                ],
                stretching: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Adductors", "Calves", "Quadriceps"]} } },
                  { $sample: { size: 3 } }
                ]
            } },
            { $project: {
                exercises: { $concatArrays: ["$stretching", "$adductors", "$calves", "$glutes", "$hamstrings", "$quadriceps"] }
            } },
            { $unwind: "$exercises" },
            { $replaceRoot: { newRoot: "$exercises" } }
          ])
          .then(exercises => {
            return req.user.addLegExercisesToWorkoutPlan(exercises);
          });
        })
        .then(() => {
          return Exercise.aggregate([
            { $facet: {
                triceps: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Triceps" } },
                  { $sample: { size: 3 } }
                ],
                biceps: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Biceps" } },
                  { $sample: { size: 3 } }
                ],
                forearms: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Forearms" } },
                  { $sample: { size: 1 } }
                ],
                stretching: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Triceps", "Biceps ", "Forearms"]} } },
                  { $sample: { size: 3 } }
                ]
            } },
            { $project: {
                exercises: { $concatArrays: ["$stretching", "$triceps", "$biceps", "$forearms"] }
            } },
            { $unwind: "$exercises" },
            { $replaceRoot: { newRoot: "$exercises" } }
          ])
          .then(exercises => {
            return req.user.addArmExercisesToWorkoutPlan(exercises);
          });
        })
        .then(() => {
          return Exercise.aggregate([
            { $facet: {
                lats: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Lats" } },
                  { $sample: { size: 2 } }
                ],
                lowerBack: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Lower Back" } },
                  { $sample: { size: 2 } }
                ],
                middleBack: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Middle Back" } },
                  { $sample: { size: 2 } }
                ],
                stretching: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Lats", "Lower Back", "Middle Back"]} } },
                  { $sample: { size: 3 } }
                ]
            } },
            { $project: {
                exercises: { $concatArrays: ["$stretching", "$lats", "$lowerBack", "$middleBack"] }
            } },
            { $unwind: "$exercises" },
            { $replaceRoot: { newRoot: "$exercises" } }
          ])
          .then(exercises => {
            return req.user.addBackExercisesToWorkoutPlan(exercises);
          })        
        })
        .then(() => {
          return Exercise.aggregate([
            { $facet: {
                shoulders: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Shoulders" } },
                  { $sample: { size: 6 } }
                ],
                neck: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Neck" } },
                  { $sample: { size: 1 } }
                ],
                traps: [
                  { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Traps" } },
                  { $sample: { size: 1 } }
                ],
                stretching: [
                  { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in:  ["Shoulders", "Neck", "Traps"]} } },
                  { $sample: { size: 3 } }
                ]
            } },
            { $project: {
                exercises: { $concatArrays: ["$stretching", "$shoulders", "$neck", "$traps"] }
            } },
            { $unwind: "$exercises" },
            { $replaceRoot: { newRoot: "$exercises" } }
          ])
          .then(exercises => {
            return req.user.addShoulderExercisesToWorkoutPlan(exercises);
          })        
        })
        .then(() => {
          res.send(req.user.workoutPlan);
        })
        .catch(err => {
          console.error(err);
          res.status(500).send("Error adding exercises to workout plan");
        }); 
    } 
    
  
  
    else if(Training_Location == "gym" && goal == "cardio") { // Completed
      Exercise.aggregate([
        { $facet: {
            chest: [
              { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Chest" } },
              { $sample: { size: 6 } }
            ]
        } },
        { $project: {
            exercises: { $concatArrays: ["$chest"] }
        } },
        { $unwind: "$exercises" },
        { $replaceRoot: { newRoot: "$exercises" } }
      ])
      .then(exercises => {
        return req.user.addChestExercisesToWorkoutPlan(exercises);
      })    
      .then(() => {
        return Exercise.aggregate([
          { $facet: {
              adductors: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Adductors" } },
                { $sample: { size: 1 } }
              ],
              calves: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Calves" } },
                { $sample: { size: 2 } }
              ],
              glutes: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Glutes" } },
                { $sample: { size: 1 } }
              ],
              hamstrings: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Hamstrings" } },
                { $sample: { size: 1 } }
              ],
              quadriceps: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Quadriceps" } },
                { $sample: { size: 2 } }
              ]
          } },
          { $project: {
              exercises: { $concatArrays: ["$adductors", "$calves", "$glutes", "$hamstrings", "$quadriceps"] }
          } },
          { $unwind: "$exercises" },
          { $replaceRoot: { newRoot: "$exercises" } }
        ])
        .then(exercises => {
          return req.user.addLegExercisesToWorkoutPlan(exercises);
        })      
      })
      .then(() => {
        return Exercise.aggregate([
          { $facet: {
              triceps: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Triceps" } },
                { $sample: { size: 3 } }
              ],
              biceps: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Biceps" } },
                { $sample: { size: 3 } }
              ],
              forearms: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Forearms" } },
                { $sample: { size: 1 } }
              ]
          } },
          { $project: {
              exercises: { $concatArrays: ["$triceps", "$biceps", "$forearms"] }
          } },
          { $unwind: "$exercises" },
          { $replaceRoot: { newRoot: "$exercises" } }
        ])
        .then(exercises => {
          return req.user.addArmExercisesToWorkoutPlan(exercises);
        })      
      })
      .then(() => {
        return Exercise.aggregate([
          { $facet: {
              lats: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Lats" } },
                { $sample: { size: 2 } }
              ],
              lowerBack: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Lower Back" } },
                { $sample: { size: 2 } }
              ],
              middleBack: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Middle Back" } },
                { $sample: { size: 2 } }
              ]
          } },
          { $project: {
              exercises: { $concatArrays: ["$lats", "$lowerBack", "$middleBack"] }
          } },
          { $unwind: "$exercises" },
          { $replaceRoot: { newRoot: "$exercises" } }
        ])
        .then(exercises => {
          return req.user.addBackExercisesToWorkoutPlan(exercises);
        })    
      })
      .then(() => {
        return Exercise.aggregate([
          { $facet: {
              shoulders: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Shoulders" } },
                { $sample: { size: 6 } }
              ],
              traps: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Traps" } },
                { $sample: { size: 1 } }
              ],
              neck: [
                { $match: { 'Type': { $in: ["Cardio", "Plyometrics"] }, 'Level': level, "BodyPart": "Neck" } },
                { $sample: { size: 1 } }
              ]
          } },
          { $project: {
              exercises: { $concatArrays: ["$shoulders", "$traps", "$neck"] }
          } },
          { $unwind: "$exercises" },
          { $replaceRoot: { newRoot: "$exercises" } }
        ])
        .then(exercises => {
          return req.user.addShoulderExercisesToWorkoutPlan(exercises);
        })      
      })
      .then(() => {
        res.send(req.user.workoutPlan);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error adding exercises to workout plan");
      });
    } 
    
  
  
    else if(Training_Location == "home" && goal == "cut") { // Completed
      Exercise.aggregate([
        { $facet: {
            chest: [
              { $match: { 'Equipment': "Body Only", 'Type': {$in: ["Cardio", "Strength"]}, 'Level': level, "BodyPart": "Chest" } },
              { $sample: { size: 6 } }
            ],
            stretching: [
              { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": "Chest" } },
              { $sample: { size: 3 } }
            ]
        } },
        { $project: {
            exercises: { $concatArrays: ["$stretching", "$chest"] }
        } },
        { $unwind: "$exercises" },
        { $replaceRoot: { newRoot: "$exercises" } }
      ])
      .then(exercises => {
        return req.user.addChestExercisesToWorkoutPlan(exercises);
      })    
      .then(() => {
        return Exercise.aggregate([
          {
            $facet: {
              adductors: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Adductors" } },
                { $sample: { size: 1 } }
              ],
              calves: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Calves" } },
                { $sample: { size: 2 } }
              ],
              glutes: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Glutes" } },
                { $sample: { size: 1 } }
              ],
              hamstrings: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Hamstrings" } },
                { $sample: { size: 1 } }
              ],
              quadriceps: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Quadriceps" } },
                { $sample: { size: 2 } }
              ],
              stretching: [
                { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Adductors", "Calves", "Glutes", "Hamstrings", "Quadriceps"]} } },
                { $sample: { size: 3 } }
              ]
            }
          },
          {
            $project: {
              exercises: { $concatArrays: ["$stretching", "$adductors", "$calves", "$glutes", "$hamstrings", "$quadriceps"] }
            }
          },
          { $unwind: "$exercises" },
          { $replaceRoot: { newRoot: "$exercises" } }
        ])
        .then(exercises => {
          return req.user.addLegExercisesToWorkoutPlan(exercises);
        })     
      })
      .then(() => {
        return Exercise.aggregate([
          {
            $facet: {
              triceps: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Triceps" } },
                { $sample: { size: 3 } }
              ],
              biceps: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Biceps" } },
                { $sample: { size: 3 } }
              ],
              forearms: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Forearms" } },
                { $sample: { size: 1 } }
              ],
              stretching: [
                { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Triceps", "Biceps", "Forearms"]} } },
                { $sample: { size: 3 } }
              ]
            }
          },
          {
            $project: {
              exercises: { $concatArrays: ["$stretching", "$triceps", "$biceps", "$forearms"] }
            }
          },
          { $unwind: "$exercises" },
          { $replaceRoot: { newRoot: "$exercises" } }
        ])
        .then(exercises => {
          return req.user.addArmExercisesToWorkoutPlan(exercises);
        })      
      })
      .then(() => {
        return Exercise.aggregate([
          {
            $facet: {
              lats: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Lats" } },
                { $sample: { size: 2 } }
              ],
              lowerBack: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Lower Back" } },
                { $sample: { size: 2 } }
              ],
              middleBack: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Middle Back" } },
                { $sample: { size: 2 } }
              ],
              stretching: [
                { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Lats", "Lower Back", "Middle Back"]} } },
                { $sample: { size: 3 } }
              ]
            }
          },
          {
            $project: {
              exercises: { $concatArrays: ["$stretching", "$lats", "$lowerBack", "$middleBack"] }
            }
          },
          { $unwind: "$exercises" },
          { $replaceRoot: { newRoot: "$exercises" } }
        ])
        .then(exercises => {
          return req.user.addBackExercisesToWorkoutPlan(exercises);
        })      
      })
      .then(() => {
        return Exercise.aggregate([
          {
            $facet: {
              shoulders: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Shoulders" } },
                { $sample: { size: 5 } }
              ],
              neck: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Neck" } },
                { $sample: { size: 1 } }
              ],
              traps: [
                { $match: { 'Equipment': "Body Only", 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Traps" } },
                { $sample: { size: 1 } }
              ],
              stretching: [
                { $match: { 'Equipment': "Body Only", 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Shoulders", "Neck", "Traps"]} } },
                { $sample: { size: 3 } }
              ]
            }
          },
          {
            $project: {
              exercises: { $concatArrays: ["$stretching", "$shoulders", "$neck", "$traps"] }
            }
          },
          { $unwind: "$exercises" },
          { $replaceRoot: { newRoot: "$exercises" } }
        ])
        .then(exercises => {
          return req.user.addShoulderExercisesToWorkoutPlan(exercises);
        })      
      })
      .then(() => {
        res.send(req.user.workoutPlan);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error adding exercises to workout plan");
      });
    } 
    
    
  
    else if(Training_Location == "gym" && goal == "cut") { // Completed
      Exercise.aggregate([
        {
          $facet: {
            chest: [
              { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Chest" } },
              { $sample: { size: 6 } }
            ],
            stretches: [
              { $match: { 'Type': "Stretching", 'Level': level, "BodyPart": "Chest" } },
              { $sample: { size: 3 } }
            ]
          }
        },
        {
          $project: {
            exercises: { $concatArrays: ["$stretches", "$chest"] }
          }
        },
        { $unwind: "$exercises" },
        { $replaceRoot: { newRoot: "$exercises" } }
      ])
      .then(exercises => {
        return req.user.addChestExercisesToWorkoutPlan(exercises);
      })    
      .then(() => {
        return Exercise.aggregate([
          {
            $facet: {
              adductors: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Adductors" } },
                { $sample: { size: 1 } }
              ],
              calves: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Calves" } },
                { $sample: { size: 2 } }
              ],
              glutes: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Glutes" } },
                { $sample: { size: 1 } }
              ],
              hamstrings: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Hamstrings" } },
                { $sample: { size: 1 } }
              ],
              quadriceps: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Quadriceps" } },
                { $sample: { size: 2 } }
              ],
              stretching: [
                { $match: { 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Adductors", "Calves", "Glutes", "Hamstrings", "Quadriceps"]} } },
                { $sample: { size: 3 } }
              ]
            }
          },
          {
            $project: {
              exercises: { $concatArrays: ["$stretching", "$adductors", "$calves", "$glutes", "$hamstrings", "$quadriceps"] }
            }
          },
          { $unwind: "$exercises" },
          { $replaceRoot: { newRoot: "$exercises" } }
        ])
        .then(exercises => {
          return req.user.addLegExercisesToWorkoutPlan(exercises);
        })      
      })
      .then(() => {
        return Exercise.aggregate([
          {
            $facet: {
              triceps: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Triceps" } },
                { $sample: { size: 3 } }
              ],
              biceps: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Biceps" } },
                { $sample: { size: 3 } }
              ],
              forearms: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Forearms" } },
                { $sample: { size: 1 } }
              ],
              stretching: [
                { $match: { 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Triceps", "Biceps", "Forearms"]} } },
                { $sample: { size: 3 } }
              ]
            }
          },
          {
            $project: {
              exercises: { $concatArrays: ["$stretching", "$triceps", "$biceps", "$forearms"] }
            }
          },
          { $unwind: "$exercises" },
          { $replaceRoot: { newRoot: "$exercises" } }
        ])
        .then(exercises => {
          return req.user.addArmExercisesToWorkoutPlan(exercises);
        })      
      })
      .then(() => {
        return Exercise.aggregate([
          {
            $facet: {
              lats: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Lats" } },
                { $sample: { size: 2 } }
              ],
              lowerBack: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Lower Back" } },
                { $sample: { size: 2 } }
              ],
              middleBack: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Middle Back" } },
                { $sample: { size: 2 } }
              ],
              stretching: [
                { $match: { 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Lats", "Lower Back", "Middle Back"]} } },
                { $sample: { size: 3 } }
              ]
            }
          },
          {
            $project: {
              exercises: { $concatArrays: ["$stretching", "$lats", "$lowerBack", "$middleBack"] }
            }
          },
          { $unwind: "$exercises" },
          { $replaceRoot: { newRoot: "$exercises" } }
        ])
        .then(exercises => {
          return req.user.addBackExercisesToWorkoutPlan(exercises);
        })      
      })
      .then(() => {
        return Exercise.aggregate([
          {
            $facet: {
              shoulders: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Shoulders" } },
                { $sample: { size: 6 } }
              ],
              neck: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Neck" } },
                { $sample: { size: 1 } }
              ],
              traps: [
                { $match: { 'Type': { $in: ["Cardio", "Strength"] }, 'Level': level, "BodyPart": "Traps" } },
                { $sample: { size: 1 } }
              ],
              stretching: [
                { $match: { 'Type': "Stretching", 'Level': level, "BodyPart": {$in: ["Shoulders", "Neck", "Traps"]} } },
                { $sample: { size: 3 } }
              ]
            }
          },
          {
            $project: {
              exercises: { $concatArrays: ["$stretching", "$shoulders", "$neck", "$traps"] }
            }
          },
          { $unwind: "$exercises" },
          { $replaceRoot: { newRoot: "$exercises" } }
        ])
        .then(exercises => {
          return req.user.addShoulderExercisesToWorkoutPlan(exercises);
        })      
      })
      .then(() => {
        res.send(req.user.workoutPlan);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Error adding exercises to workout plan");
      });
    }
};