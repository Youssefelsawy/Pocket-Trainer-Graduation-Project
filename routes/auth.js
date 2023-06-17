const express = require('express');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const authinticationController = require('../controllers/auth');

const isAuth = require('../middleware/is-auth');

const router = express.Router();
  
router.get('/login/:email', authinticationController.getLogin);

router.post('/loggedin', authinticationController.postLogin);

router.get('/profile',isAuth, authinticationController.getProfile)

router.post('/logout',isAuth, authinticationController.postLogout);

router.post('/signup', upload.single('photo'), authinticationController.signUp);



module.exports = router;