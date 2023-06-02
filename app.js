const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors')

const User = require('./models/user');
const errorController = require('./controllers/error');

const MONGODB_URI = 'mongodb+srv://youssefelsawy:7WE62UIa4j25Yd31@cluster0.4uq3vsh.mongodb.net/pocketTrainer?retryWrites=true&w=majority'
const app = express();
// const store = new MongoDBStore({
//     uri: MONGODB_URI,
//     collection: 'sessions'
// });

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add a middleware to set the Access-Control-Allow-Origin header to '*'
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
// app.use(
//     session({
//         secret: 'my secret',
//         resave: false,
//         saveUninitialized: false,
//         store: store
//     })
// );
app.use(authRoutes);
// app.use((req, res, next) => {
//     User.findById(req.session.userId)
//     .then(user => {
//         req.user = user;
//         next();
//     })
//     .catch(err => {console.log(err)});
// })


app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use((error, req, res, next) => {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal server error' });
  });
  

app.use(errorController.get404);

mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(443);
    console.log('connected!');
})
.catch(err => {
    console.log(err);
})