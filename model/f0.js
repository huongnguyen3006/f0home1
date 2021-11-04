const mongoose = require("mongoose");

const f0Schema = new mongoose.Schema({
  created_by: { type: String, default: null },
  name: { type: String, default: null },
  age: { type: String, default: 0 },
  add: {type: String, default: null},
  tel: { type: Number, default: null},
  zalo: {type: Number, default: null},
  treated_by: {},
  dop: {type: Date, default: null},
  symptoms_st:{type: String, default: null},
  don:  {type: Date, default: null},
  treatment: {type: String, default: null},
  note: {type: String, default: null},
  exams: []

});


module.exports = mongoose.model("f0", f0Schema);