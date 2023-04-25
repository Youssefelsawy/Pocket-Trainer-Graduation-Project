const Stretch = require('../models/stretch');

exports.getChestStretches = (req, res, next) => {
    Stretch.find({'bodyPart': 'chest'})
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };
 
  exports.getBicepsStretches = (req, res, next) => {
    Stretch.find({'bodyPart': 'biceps'})
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };

  exports.getTricepsStretches = (req, res, next) => {
    Stretch.find({'bodyPart': 'triceps'})
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };

  exports.getBackStretches = (req, res, next) => {
    Stretch.find({'bodyPart': 'back'})
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };

  exports.getLegStretches = (req, res, next) => {
    Stretch.find({'bodyPart': 'leg'})
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };

  exports.getShloulderStretches = (req, res, next) => {
    Stretch.find({'bodyPart': 'shoulder'})
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };

  exports.getStretchById = (req, res, next) => {
    const stretchId = req.params.stretchId;
    Stretch.findById(stretchId) 
    .then(stretch => {
      res.send(stretch);
    })
    .catch(err => console.log(err))
  };