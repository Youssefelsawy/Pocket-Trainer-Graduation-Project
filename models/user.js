const mongoose = require('mongoose');
const meal = require('./meal');
const crypto = require("crypto");

const Schema = mongoose.Schema;

global.exist = Boolean;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    ListOfRequirment: {
        HW: {
                height: Number,
                weight: Number
        }
        ,
        workingOffDays: {
                Day1: Number,
                Day2: Number,
                Day3: Number,
                Day4: Number,
                Day5: Number,
                Day6: Number,
                Day7: Number
        },
        training_location: String,
        goal: String,
        level: String,
    },
    passwordResetToken : String,
    passwordResetExpires : Date,
    workoutPlan: {
        ChestDay: [
            {
                exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
                Title: { type: String, required: true },
                BodyPart: { type: String, required: true },
                Type: { type: String, required: true },
                Desc: { type: String, required: true },
                Equipment: { type: String, required: true },
                Level: { type: String, required: true },
                imageUrl: { type: String, required: true },
                Sets: { type: String, required: true },
                Reps: { type: String, required: true }
            }
        ],
        LegDay: [
            {
                exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
                Title: { type: String, required: true },
                BodyPart: { type: String, required: true },
                Type: { type: String, required: true },
                Desc: { type: String, required: true },
                Equipment: { type: String, required: true },
                Level: { type: String, required: true },
                imageUrl: { type: String, required: true },
                Sets: { type: String, required: true },
                Reps: { type: String, required: true }
            }
        ],
        ArmDay: [
            {
                exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
                Title: { type: String, required: true },
                BodyPart: { type: String, required: true },
                Type: { type: String, required: true },
                Desc: { type: String, required: false },
                Equipment: { type: String, required: true },
                Level: { type: String, required: true },
                imageUrl: { type: String, required: true },
                Sets: { type: String, required: true },
                Reps: { type: String, required: true }
            }
        ],
        BackDay: [
            {
                exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
                Title: { type: String, required: true },
                BodyPart: { type: String, required: true },
                Type: { type: String, required: true },
                Desc: { type: String, required: false },
                Equipment: { type: String, required: true },
                Level: { type: String, required: true },
                imageUrl: { type: String, required: true },
                Sets: { type: String, required: true },
                Reps: { type: String, required: true }
            }
        ],
        ShoulderDay: [
            {
                exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
                Title: { type: String, required: true },
                BodyPart: { type: String, required: true },
                Type: { type: String, required: true },
                Desc: { type: String, required: false },
                Equipment: { type: String, required: true },
                Level: { type: String, required: true },
                imageUrl: { type: String, required: true },
                Sets: { type: String, required: true },
                Reps: { type: String, required: true }
            }
        ]
    },
    NutritionPlan: {
        Meals: [
            {
                mealId: { type: Schema.Types.ObjectId, ref: 'Meal', required: true },
                name: { type: String, required: true },
                imageUrl: { type: String, required: true },
                protein: { type: String, required: true },
                calories: { type: String, required: true },
                carbs: { type: String, required: true },
                fats: { type: String, required: true },
                typeofMeal: { type: String, required: true },
                quantity: { type: String, required: false }
            }
        ]
    }
});



//forget password
userSchema.methods.createPasswordResetToken = function (){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    console.log({resetToken},this.passwordResetToken);
    return resetToken;
 }



//WorkoutPlan Methods
//user add exercises to workoutplan and check if it is already exist
userSchema.methods.addToChestDay = function(exercise) {
        const exerciseWorkoutIndex = this.workoutPlan.ChestDay.findIndex(cp => {
            return cp.exerciseId.toString() === exercise._id.toString();
        });
        const updatedChestDay= [...this.workoutPlan.ChestDay];
        if(exerciseWorkoutIndex >= 0){
            console.log('this exercise already added in your workoutPlan');
            exist = true;
        }
        else if (exerciseWorkoutIndex < 0) {
            updatedChestDay.push({
                exerciseId: exercise._id,
                Title: exercise.Title,
                BodyPart: exercise.BodyPart,
                Type: exercise.Type,
                Desc: exercise.Desc,
                Equipment: exercise.Equipment,
                Level: exercise.Level,
                imageUrl: exercise.imageUrl,
                Sets: exercise.Sets,
                Reps: exercise.Reps
            });
        }
        // const updatedWorkoutPlan = {
        //     ChestDay: updatedChestDay
        // };
        this.workoutPlan.ChestDay = updatedChestDay;
        return this.save();
};

userSchema.methods.addToBackDay = function(exercise) {
    const exerciseWorkoutIndex = this.workoutPlan.BackDay.findIndex(cp => {
        return cp.exerciseId.toString() === exercise._id.toString();
    });
    const updatedBackDay= [...this.workoutPlan.BackDay];
    if(exerciseWorkoutIndex >= 0){
        console.log('this exercise already added in your workoutPlan');
        exist = true;
    }
    else if (exerciseWorkoutIndex < 0) {
        updatedBackDay.push({
            exerciseId: exercise._id,
            Title: exercise.Title,
            BodyPart: exercise.BodyPart,
            Type: exercise.Type,
            Desc: exercise.Desc,
            Equipment: exercise.Equipment,
            Level: exercise.Level,
            imageUrl: exercise.imageUrl,
            Sets: exercise.Sets,
            Reps: exercise.Reps
        });
    }
    this.workoutPlan.BackDay = updatedBackDay;
    return this.save();
};

userSchema.methods.addToArmDay = function(exercise) {
    const exerciseWorkoutIndex = this.workoutPlan.ArmDay.findIndex(cp => {
        return cp.exerciseId.toString() === exercise._id.toString();
    });
    const updatedArmDay= [...this.workoutPlan.ArmDay];
    if(exerciseWorkoutIndex >= 0){
        console.log('this exercise already added in your workoutPlan');
        exist = true;
    }
    else if (exerciseWorkoutIndex < 0) {
        updatedArmDay.push({
            exerciseId: exercise._id,
            Title: exercise.Title,
            BodyPart: exercise.BodyPart,
            Type: exercise.Type,
            Desc: exercise.Desc,
            Equipment: exercise.Equipment,
            Level: exercise.Level,
            imageUrl: exercise.imageUrl,
            Sets: exercise.Sets,
            Reps: exercise.Reps
        });
    }
    this.workoutPlan.ArmDay = updatedArmDay;
    return this.save();
};

userSchema.methods.addToLegDay = function(exercise) {
    const exerciseWorkoutIndex = this.workoutPlan.LegDay.findIndex(cp => {
        return cp.exerciseId.toString() === exercise._id.toString();
    });
    const updatedLegDay= [...this.workoutPlan.LegDay];
    if(exerciseWorkoutIndex >= 0){
        console.log('this exercise already added in your workoutPlan');
        exist = true;
    }
    else if (exerciseWorkoutIndex < 0) {
        updatedLegDay.push({
            exerciseId: exercise._id,
            Title: exercise.Title,
            BodyPart: exercise.BodyPart,
            Type: exercise.Type,
            Desc: exercise.Desc,
            Equipment: exercise.Equipment,
            Level: exercise.Level,
            imageUrl: exercise.imageUrl,
            Sets: exercise.Sets,
            Reps: exercise.Reps
        });
    }
    this.workoutPlan.LegDay = updatedLegDay;
    return this.save();
};

userSchema.methods.addToShoulderDay = function(exercise) {
    const exerciseWorkoutIndex = this.workoutPlan.ShoulderDay.findIndex(cp => {
        return cp.exerciseId.toString() === exercise._id.toString();
    });
    const updatedShoulderDay= [...this.workoutPlan.ShoulderDay];
    if(exerciseWorkoutIndex >= 0){
        console.log('this exercise already added in your workoutPlan');
        exist = true;
    }
    else if (exerciseWorkoutIndex < 0) {
        updatedShoulderDay.push({
            exerciseId: exercise._id,
            Title: exercise.Title,
            BodyPart: exercise.BodyPart,
            Type: exercise.Type,
            Desc: exercise.Desc,
            Equipment: exercise.Equipment,
            Level: exercise.Level,
            imageUrl: exercise.imageUrl,
            Sets: exercise.Sets,
            Reps: exercise.Reps
        });
    }
    this.workoutPlan.ShoulderDay = updatedShoulderDay;
    return this.save();
};


//WorkoutPlan Methods
//create workoutplan with recommendation exercises
userSchema.methods.addChestExercisesToWorkoutPlan = function(exercises) {
    const ChestExercises = []
    for( let exercise of exercises ){
        ChestExercises.push({
            exerciseId: exercise._id,
            Title: exercise.Title,
            BodyPart: exercise.BodyPart,
            Type: exercise.Type,
            Desc: exercise.Desc,
            Equipment: exercise.Equipment,
            Level: exercise.Level,
            imageUrl: exercise.imageUrl,
            Sets: exercise.Sets,
            Reps: exercise.Reps
        })
    }
    this.workoutPlan.ChestDay = ChestExercises
    return this.save();
}

userSchema.methods.addLegExercisesToWorkoutPlan = function(exercises) {
    const LegExercises = []
    for( let exercise of exercises ){
        LegExercises.push({
            exerciseId: exercise._id,
            Title: exercise.Title,
            BodyPart: exercise.BodyPart,
            Type: exercise.Type,
            Desc: exercise.Desc,
            Equipment: exercise.Equipment,
            Level: exercise.Level,
            imageUrl: exercise.imageUrl,
            Sets: exercise.Sets,
            Reps: exercise.Reps
        })
    }
    this.workoutPlan.LegDay = LegExercises
    return this.save();
}

userSchema.methods.addArmExercisesToWorkoutPlan = function(exercises) {
    const ArmExercises = []
    for( let exercise of exercises ){
        ArmExercises.push({
            exerciseId: exercise._id,
            Title: exercise.Title,
            BodyPart: exercise.BodyPart,
            Type: exercise.Type,
            Desc: exercise.Desc,
            Equipment: exercise.Equipment,
            Level: exercise.Level,
            imageUrl: exercise.imageUrl,
            Sets: exercise.Sets,
            Reps: exercise.Reps
        })
    }
    this.workoutPlan.ArmDay = ArmExercises
    return this.save();
}

userSchema.methods.addBackExercisesToWorkoutPlan = function(exercises) {
    const BackExercises = []
    for( let exercise of exercises ){
        BackExercises.push({
            exerciseId: exercise._id,
            Title: exercise.Title,
            BodyPart: exercise.BodyPart,
            Type: exercise.Type,
            Desc: exercise.Desc,
            Equipment: exercise.Equipment,
            Level: exercise.Level,
            imageUrl: exercise.imageUrl,
            Sets: exercise.Sets,
            Reps: exercise.Reps
        })
    }
    this.workoutPlan.BackDay = BackExercises
    return this.save();
}

userSchema.methods.addShoulderExercisesToWorkoutPlan = function(exercises) {
    const ShoulderExercises = []
    for( let exercise of exercises ){
        ShoulderExercises.push({
            exerciseId: exercise._id,
            Title: exercise.Title,
            BodyPart: exercise.BodyPart,
            Type: exercise.Type,
            Desc: exercise.Desc,
            Equipment: exercise.Equipment,
            Level: exercise.Level,
            imageUrl: exercise.imageUrl,
            Sets: exercise.Sets,
            Reps: exercise.Reps
        })
    }
    this.workoutPlan.ShoulderDay = ShoulderExercises
    return this.save();
}

//WorkoutPlan Methods
// removing exercise whatever day he exist in workoutplan
userSchema.methods.removeExerciseFromWorkoutPlan = function (exerciseId) {
    const updatedChestDayWorkoutPlan = this.workoutPlan.ChestDay.filter(exercise => {
      return exercise.exerciseId.toString() !== exerciseId.toString();
    });
    this.workoutPlan.ChestDay = updatedChestDayWorkoutPlan;
  
    const updatedBackDayWorkoutPlan = this.workoutPlan.BackDay.filter(exercise => {
      return exercise.exerciseId.toString() !== exerciseId.toString();
    });
    this.workoutPlan.BackDay = updatedBackDayWorkoutPlan;
  
    const updatedLegDayWorkoutPlan = this.workoutPlan.LegDay.filter(exercise => {
      return exercise.exerciseId.toString() !== exerciseId.toString();
    });
    this.workoutPlan.LegDay = updatedLegDayWorkoutPlan;
  
    const updatedArmDayWorkoutPlan = this.workoutPlan.ArmDay.filter(exercise => {
      return exercise.exerciseId.toString() !== exerciseId.toString();
    });
    this.workoutPlan.ArmDay = updatedArmDayWorkoutPlan;
  
    const updatedShoulderDayWorkoutPlan = this.workoutPlan.ShoulderDay.filter(exercise => {
      return exercise.exerciseId.toString() !== exerciseId.toString();
    });
    this.workoutPlan.ShoulderDay = updatedShoulderDayWorkoutPlan;
  
    return this.save();
  };
  



//NutritionPlan Methods
userSchema.methods.addToNutritionPlan = function(meal) {
    const nutritionMealIndex = this.NutritionPlan.Meals.findIndex(cp => {
        return cp.mealId.toString() === meal._id.toString();
    });
    const updatedNutritionPlanMeals= [...this.NutritionPlan.Meals];
    if(nutritionMealIndex >= 0){
        console.log('this meal already added in your Nutrition Plan');
        exist = true;
    }
    else if (nutritionMealIndex < 0) {
        updatedNutritionPlanMeals.push({
            mealId: meal._id,
            name: meal.name,
            imageUrl: meal.imageUrl,
            fats: meal.fats,
            carbs: meal.carbs,
            protein: meal.protein,
            calories: meal.calories,
            quantity: meal.quantity,
            typeofMeal: meal.typeofMeal
        });
    }
    this.NutritionPlan.Meals = updatedNutritionPlanMeals;
    return this.save();
};

userSchema.methods.removeFromNutritionPlan = function (mealId) {
    const updatedNutritionPlanMeals = this.NutritionPlan.Meals.filter(meal => {
        return meal.mealId.toString() !== mealId.toString();
    });
    this.NutritionPlan.Meals = updatedNutritionPlanMeals;
    return this.save();
};






module.exports = mongoose.model('User', userSchema);


// const mongodb = require('mongodb');

// class User {
//     constructor(username, email, cart, id) {
//         this.name = username;
//         this.email = email;
//         this.cart = cart
//         this._id = id;
//     }

//     save() {
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }

//     addToCart(product) {
//         const productCartIndex = this.cart.items.findIndex(cp => {
//             return cp.productId.toString() === product._id.toString();
//         });
//         const updatedCartItems = [...this.cart.items];
//         if(productCartIndex >= 0){
//             updatedCartItems[productCartIndex].quantity = updatedCartItems[productCartIndex].quantity +1
//         }
//         else{
//             updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: 1});
//         }
//         const updatedCart = {
//             items: updatedCartItems
//         }
//         const db = getDb();
//         return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}});
//     }

//     getCart() {
//         const db = getDb();
//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         })
//         return db.collection('products')
//         .find({_id: {$in: productIds}})
//         .toArray()
//         .then(products => {
//             return products.map(p => {
//                 return{...p, quantity: this.cart.items.find(i => {
//                     return i.productId.toString() === p._id.toString();
//                 })}.quantity
//             })
//         })
//     }

//     deleteItemFromCart(productId) {
//         const updatedCartItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== productId.toString();
//         });
//         const db = getDb();
//         return db.collection('users')
//         .updateOne({ _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } } );
//     }

//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users')
//         .findOne({_id: new mongodb.ObjectId(userId)})
//         .then(user => {
//             console.log(user);
//             return user;
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     }
// }

// module.exports = User;