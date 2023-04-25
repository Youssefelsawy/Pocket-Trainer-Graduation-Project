const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exercise_Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  bodyPart: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tips: {
    type: String,
    required: false
  },
  repetition: {
    type: [String, Number],
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Exercise', exercise_Schema);

// module.exports = class Product {
//     constructor(title, imageUrl, description, price, id, userId) {
//       this.title = title;
//       this.imageUrl = imageUrl;
//       this.description = description;
//       this.price = price;
//       this._id = id ? new mongodb.ObjectId(id) : null;
//       this.userId = userId;
//     }
//     save() {
//       const db = getDb();
//       let dbOp;
//       if(this._id){
//         //update the produt
//         dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});
//       }else{
//         dbOp = db.collection('products').insertOne(this);
//       }
//         return dbOp
//         .then(result => {
//           console.log(result);
//         })
//         .catch(err => {
//           console.log(err);
//         })     
      
//     }

//     static fetchAll() {
//        const db = getDb();
//        return db.collection('products')
//        .find()
//        .toArray()
//        .then(products => {
//         //  console.log(products);
//          return products;
//        })
//        .catch(err => {
//         console.log(err);
//        });
//     }

//     static deleteById(prodId) {
//       const db = getDb();
//       return db.collection('products')
//       .deleteOne({_id: new mongodb.ObjectId(prodId)})
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => console.log(err))
//     }

//     static findById(prodId) {
//       const db = getDb();
//       return db.collection('products')
//       .find({_id: new mongodb.ObjectId(prodId)})
//       .next()
//       .then(product => {
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       })
//     }

//   };

