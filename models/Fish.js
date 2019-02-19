const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const fishSchema = new mongoose.Schema({
  fisherman: {
    type: String,
    required: true,
    trim: true
  },
  longitude: {
    type: Number,
    required: true,
    trim: true
  },
  latitude: {
    type: Number,
    required: true
  },
  specie: {
    type: String,
    required: true,
    trim: true
  },
  weight: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  imageURL: {
    type: String,
    required: true,
    trim: true
  }
})

// add created at, updated att automatical
fishSchema.plugin(timestamp)

const Fisher = mongoose.model('Fish', fishSchema)
module.exports = Fisher
