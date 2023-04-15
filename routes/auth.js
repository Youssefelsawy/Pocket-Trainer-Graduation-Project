const express = require('express');

const authinticationController = require('../controllers/auth');

const isAuth = require('../middleware/is-auth');

const router = express.Router();
  
router.get('/login/:email', authinticationController.getLogin);

router.post('/loggedin', authinticationController.postLogin);

router.get('/profile',isAuth, authinticationController.getProfile)

router.post('/logout',isAuth, authinticationController.postLogout);

router.post('/signup', authinticationController.signUp);



module.exports = router;