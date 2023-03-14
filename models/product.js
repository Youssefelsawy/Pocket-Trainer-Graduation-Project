const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '../', 'data', 'products.json');
const  getDataFromFile = pro => {
    fs.readFile(p, (err, fileContent) => {
        if(err){
           return pro([]);
        }
        pro(JSON.parse(fileContent));
    })
}

module.exports = class product{
    constructor(title, imageUrl, price, description){
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save(){
        this.id = Math.random().toString();
        getDataFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })
    }

    static fetchAll(pro){
        getDataFromFile(pro);
    }

    static findById(id, cb) {
        getDataFromFile(products => {
            const findedProduct = products.find(p => p.id === id);
            cb(findedProduct);
        })
    }
}