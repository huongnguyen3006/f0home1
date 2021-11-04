const mongoose = require("mongoose");


const examSchema = new mongoose.Schema({
    created_by: {type: String, default: ""},
    temperature: { type: Number, default: null },
    spo2: { type: Number, default: 0 },
    dot: {type: Date, default: null},
    f0: {type :String, default: null},
    symptoms: {type: String, default: null},
    prescription:  {type: String, default: null},
    note:{type: String, default: null}


});




module.exports = mongoose.model("exam", examSchema);