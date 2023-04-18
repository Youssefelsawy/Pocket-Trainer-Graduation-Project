const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stretch_Schema = new Schema({
    name: {
        type: String,
        required: true
      },
      bodyPart: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      }
})

module.exports = mongoose.model('stretches', stretch_Schema);