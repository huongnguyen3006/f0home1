const mongoose = require("mongoose");

const f0Schema = new mongoose.Schema({
  name: { type: String, default: null },
  age: { type: Number, default: 0 }

});


module.exports = mongoose.model("f0", f0Schema);