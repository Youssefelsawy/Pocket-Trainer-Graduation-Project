const Stretch = require('../models/stretch');

exports.getChestStretches = (req, res, next) => {
    Stretch.find({'bodyPart': 'chest'})
    .select('name imageUrl bodyPart')
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };

  exports.getArmStretches = (req, res, next) => {
    Stretch.find({'bodyPart': 'arm'})
    .select('name imageUrl bodyPart')
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };

  exports.getBackStretches = (req, res, next) => {
    Stretch.find({'bodyPart': 'back'})
    .select('name imageUrl bodyPart')
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };

  exports.getLegStretches = (req, res, next) => {
    Stretch.find({'bodyPart': 'leg'})
    .select('name imageUrl bodyPart')
    .then(stretches => {
      res.send(stretches);
    })
    .catch(err => console.log(err));
  };

  exports.getShloulderStretches = (req, res, next) => {
    Stretch.find({'bodyPart': 'shoulder'})
    .select('name imageUrl bodyPart')
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