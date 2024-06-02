const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        fullname: String,
        age: Number,
        sex: String,
        height: Number,
        weight: Number,
        allergies: String,
        phone: String,
        address: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    })
);

module.exports = User;