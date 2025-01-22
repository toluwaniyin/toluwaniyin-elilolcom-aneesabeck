const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  streak: Number,
  lastUpdatedDate: Date,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
