const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  name: { type: String, default: null },
  teacher : { type: String, default: null },
  slides: { type: String, default: null },
  date: { type: String, default: null },
  video: { type: String, default: null }

});


module.exports = mongoose.model("lecture", lectureSchema);