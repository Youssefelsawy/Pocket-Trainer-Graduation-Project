const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('./models/user');

const errorController = require('./controllers/error');

const MONGODB_URI = 'mongodb+srv://youssefelsawy:7WE62UIa4j25Yd31@cluster0.4uq3vsh.mongodb.net/pocketTrainer?retryWrites=true&w=majority'
const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: true,
        store: store
    })
);
app.use(authRoutes);
app.use((req, res, next) => {
    User.findById(req.session.userId)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {console.log(err)});
})


app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(3000);
    console.log('connected!');
})
.catch(err => {
    console.log(err);
})