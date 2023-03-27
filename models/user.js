const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const productCartIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        const updatedCartItems = [...this.cart.items];
        if(productCartIndex >= 0){
            updatedCartItems[productCartIndex].quantity = updatedCartItems[productCartIndex].quantity +1
        }
        else{
            updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: 1});
        }
        const updatedCart = {
            items: updatedCartItems
        }
        const db = getDb();
        return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: updatedCart}});
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        })
        return db.collection('products')
        .find({_id: {$in: productIds}})
        .toArray()
        .then(products => {
            return products.map(p => {
                return{...p, quantity: this.cart.items.find(i => {
                    return i.productId.toString() === p._id.toString();
                })}.quantity
            })
        })
    }

    // deleteItemFromCart(productId) {
    //     const db = getDb();
    //     const productIds = this.cart.items.map(i => {
    //         return i.productId;
    //     })
    //     return db.collection('users')
    //         .deleteOne({productId}, { cart: { items: productIds } } )
    //         .then(result => {
    //             console.log(result)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    deleteItemFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => {
            console.log('this is product ID:'+productId);
            console.log('this is product id in item'+item.productId);
            return item.productId.toString() !== productId.toString();
        });
        const db = getDb();
        return db.collection('users')
        .updateOne({ _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } } );
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
        .findOne({_id: new mongodb.ObjectId(userId)})
        .then(user => {
            console.log(user);
            return user;
        })
        .catch(err => {
            console.log(err);
        })
    }
}

module.exports = User;