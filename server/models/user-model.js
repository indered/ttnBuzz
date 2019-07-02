const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  googleId: String,
  picture: String,
  email: String,
  isAdmin: { type: Boolean, default: false },
  department: { type: String, default: "" }
});

const User = mongoose.model("User", UserSchema);

module.exports.User = User;
