const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
  
    // Fetch user from database
    const user = await User.findOne({ email });
  
    // Check if user exists and password is correct
    if (!user || !await bcrypt.compare(password, user.password)) {
      res.status(401).send('Invalid email or password');
      return;
    }
    req.session.userId = user._id;
    res.send('Logged in successfully');
  }

exports.getLogin = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  req.session.userId = user._id;
    console.log(req.session);
    res.send('Logged in successfully');
}

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        console.log(err);
    })
}

exports.signUp = async (req, res) => {
      try {
        const { name, email, password } = req.body;
    
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
          return res.status(409).json({ error: 'User already exists' });
        }
    
        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            name,
            email,
            password: hashedPassword
          });
          await user.save();
          // Set user id in session
          req.session.userId = user._id;
    
        res.status(201).json({ message: 'User created' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }

};

exports.getProfile = async (req, res) => {
    // Fetch user from database using the user ID in the session
    const user = await User.findById(req.session.userId);
  
    res.send(`Welcome back, ${user.name}`);
  };