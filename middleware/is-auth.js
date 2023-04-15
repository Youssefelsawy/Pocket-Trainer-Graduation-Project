module.exports = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).send('Unauthorized');
        return;
      }
    
      next();
}