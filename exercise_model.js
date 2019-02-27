const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new mongoose.Schema({
  userId: {type:String, required: true},
  username: {type: String, required: true},
  description: {type:String,required: true},
  duration: {type:Number,required: true},
  date: Number
});



module.exports = mongoose.model('Exercise', exerciseSchema);