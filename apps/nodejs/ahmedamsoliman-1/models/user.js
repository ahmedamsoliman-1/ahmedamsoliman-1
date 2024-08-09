var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// Scema setup
var userSchema = new mongoose.Schema({
  fullname: String,
  username: String,
  age: String,
  image: String,
  password: String,
  arabic_name: String,
  email: String,
  mobile_number: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
