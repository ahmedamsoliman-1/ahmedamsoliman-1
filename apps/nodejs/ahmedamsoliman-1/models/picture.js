var mongoose = require("mongoose");

// Scema setup
var pictureSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

module.exports = mongoose.model("Picture", pictureSchema);
