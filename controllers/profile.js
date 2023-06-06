const bcrypt = require('bcrypt');
const User = require('../models/user');
const fs = require('fs');


exports.editProfile = async (req, res) => {
  try {
    //const userId = req.params.userId;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }

    if (req.file) {
      user.photo.data = fs.readFileSync(req.file.path);
      user.photo.contentType = req.file.mimetype;
    }

    await user.save();

    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.deleteProfile = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(202).json({ message: 'User deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };