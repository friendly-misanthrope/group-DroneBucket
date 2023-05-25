const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Please enter a title"],
      minLength: [3, "Photo title must be at least 3 characters"]
    },
    description: {
      type: String, 
      required: [true, "Please enter a description"],
      minLength: [3, "Photo description must be at least 8 characters"]
    },
    imageUploaded: {
      type: String, 
      required: [true, "Image is required"]
    },
    user_id:{
      type: mongoose.Types.ObjectId
  }
}, { timestamps: true });
module.exports = mongoose.model('Drone', droneSchema);