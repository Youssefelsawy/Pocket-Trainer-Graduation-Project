const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

const path = require('path');

const adminRouter = require('./routes/admin');

const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(shopRoutes);
app.use('/admin', adminRouter);

app.use(errorController.getErrorPage);

app.listen(3000);