exports.get404 = (req, res, next) => {
  res.status(404).send('404 Not Found or Bad Request');
};
