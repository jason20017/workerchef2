const mongoose = require("mongoose");
const GoogleLogin = new mongoose.Schema({
  //Goolge login
  name: {
    type: String,
    required: true,
    minLengh: 3,
    maxLength: 255,
  },
  googleID: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    type: String,
  },
});

module.exports = mongoose.model("UserGoogle", GoogleLogin);
