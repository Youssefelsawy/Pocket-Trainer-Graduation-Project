const express = require('express');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// const app = express();

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
      }
    })
  });

const authinticationController = require('../controllers/auth');

const isAuth = require('../middleware/is-auth');

const router = express.Router();
  
router.get('/login/:email', authinticationController.getLogin);

router.post('/loggedin', authinticationController.postLogin);

router.get('/profile',isAuth, authinticationController.getProfile)

router.post('/logout',isAuth, authinticationController.postLogout);

router.post('/signup', upload.single('photo'), authinticationController.signUp);



module.exports = router;