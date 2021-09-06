const mongoose = require("mongoose");

const churchSchema = new mongoose.Schema({
  name: { type: String, default: null },
  address: { type: String, default: null },

});


module.exports = mongoose.model("church", churchSchema);