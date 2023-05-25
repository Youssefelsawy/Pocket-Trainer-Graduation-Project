const jwt = require('jsonwebtoken');
const User = require('../models/user');


// module.exports = (req, res, next) => {
//     if (!req.session.userId) {
//         res.status(401).send('Unauthorized');
//         return;
//       }
    
//       next();
// }

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }
  jwt.verify(token, 'secret-key', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    console.log(req.user);
    next();
  });
};