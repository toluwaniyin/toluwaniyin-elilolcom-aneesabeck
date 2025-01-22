// schemas; structure
// models: constructors that we desfine
// to apply it to our collection


const mongoose = require("mongoose");

const TreeSchema = new mongoose.Schema({
  name: String,
  image: String,
});

// compile model from schema
module.exports = mongoose.model("tree", TreeSchema);
