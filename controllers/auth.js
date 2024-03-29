const User = require('../models/user');
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      res.status(401).send('Invalid email or password');
      return;
    }
    //req.session.userId = user._id;
    //res.send(user);
    const token = jwt.sign({ userId: user._id }, 'secret-key');
    res.json({ token });
  }


exports.postLogout = (req, res) => {
    // req.session.destroy(err => {
    //     console.log(err);
    // })
}

exports.signUp = async (req, res) => {
      try {
        const { name, email, password } = req.body;
    
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
          return res.status(409).json({ error: 'User already exists' });
        }
        console.log(req.file)
        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashedPassword,
          });
          if(req.file) {
            user.photo.data = fs.readFileSync(req.file.path);
            user.photo.contentType = req.file.mimetype;
          }
          await user.save();
          
          // Set user id in session
          //req.session.userId = user._id;
    
        res.status(201).json({ message: 'User created' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }

};

exports.getProfile = async (req, res) => {
    // Fetch user from database using the user ID in the session
    // const user = await User.findById(req.session.userId);
    // const userData = {
    //   name: user.name,
    //   email: user.email,
    //   photo: user.photo.data.toString('base64'),
    //   contentType: user.photo.contentType
    // };
    // res.send(userData);
     res.send(req.user);
  };
