// schemas; structure
// models: constructors that we desfine
// to apply it to our collection


const mongoose = require("mongoose");

const StreaksSchema = new mongoose.Schema({
  value: streaks,
});

// compile model from schema
module.exports = mongoose.model("streaks", StreaksSchema);
