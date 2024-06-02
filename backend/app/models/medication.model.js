const mongoose = require("mongoose");

const Medication = mongoose.model(
    "Medication",
    new mongoose.Schema({
        username: String,
        medication: String,
        dosage: String,
        time: String,
        days: { type: [Number] }
    })
);

module.exports = Medication;