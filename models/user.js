const mongoose = require('mongoose');
const meal = require('./meal');

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
    workoutPlan: {
        Exercises: [
            {
                exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
                name: { type: String, required: true },
                imageUrl: { type: String, required: true },
                bodyPart: { type: String, required: true },
                target: { type: String, required: true },
                description: { type: String, required: true },
                sets: { type: Number, required: true },
                repetition: { type: Number, required: true },
                tips: { type: String, required: false }
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

//WorkoutPlan Methods
userSchema.methods.addToWorkoutPlan = function(exercise) {
        const exerciseWorkoutIndex = this.workoutPlan.Exercises.findIndex(cp => {
            return cp.exerciseId.toString() === exercise._id.toString();
        });
        const updatedWorkoutPlanExercises= [...this.workoutPlan.Exercises];
        if(exerciseWorkoutIndex >= 0){
            console.log('this exercise already added in your workoutPlan');
            exist = true;
        }
        else if (exerciseWorkoutIndex < 0) {
            updatedWorkoutPlanExercises.push({
                exerciseId: exercise._id,
                name: exercise.name,
                imageUrl: exercise.imageUrl,
                bodyPart: exercise.bodyPart,
                target: exercise.target,
                description: exercise.description,
                tips: exercise.tips,
                repetition: exercise.repetition,
                sets: exercise.sets
            });
        }
        // const updatedWorkoutPlan = {
        //     Exercises: updatedWorkoutPlanExercises
        // };
        this.workoutPlan.Exercises = updatedWorkoutPlanExercises;
        return this.save();
};

userSchema.methods.removeFromWorkoutPlan = function (exeId) {
    const updatedWorkoutPlanExercises = this.workoutPlan.Exercises.filter(exercise => {
        return exercise.exerciseId.toString() !== exeId.toString();
    });
    this.workoutPlan.Exercises = updatedWorkoutPlanExercises;
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