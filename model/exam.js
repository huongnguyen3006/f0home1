const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    f0: {type: String, default: ""},
    temperature: { type: Number, default: null },
    spo2: { type: Number, default: 0 }


});


module.exports = mongoose.model("exam", examSchema);