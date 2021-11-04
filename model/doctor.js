const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  user_id: {type: String, default: null},
  name: { type: String, default: null },
  age: { type: Number, default: 0 },
  phone : { type: String, default: null },
  address: { type: String, default: null },
  avatar: { type: String, default: null }

});


module.exports = mongoose.model("doctor", doctorSchema);