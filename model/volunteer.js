const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: { type: String, default: null },
  age: { type: Number, default: 0 },
  email: { type: String, default: null },
  phone : { type: String, default: null },
  address: { type: String, default: null },
  avatar: { type: String, default: null }

});


module.exports = mongoose.model("volunteer", volunteerSchema);