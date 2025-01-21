// schemas; structure
// models: constructors that we desfine
// to apply it to our collection


const mongoose = require("mongoose");

const TreesSchema = new mongoose.Schema({
  name: String,
  image: Image,
});

// compile model from schema
module.exports = mongoose.model("trees", TreesSchema);
