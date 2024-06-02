const config = require("../config/medication.config");
const db = require("../models");
const Medication = db.medication;


exports.presribe = (req, res) => {
    const prescription = new Medication({
        username: req.body.username,
        medication: req.body.medication,
        dosage: req.body.dosage,
        time: req.body.time,
        days: req.body.days
    })
    prescription.save((err, medication) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).json(medication);
    });
}

exports.getMedicationForUser = (req, res) => {
    Medication.find({
            username: req.body.user
        })
        .exec((err, medication) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).json(medication);
        })
}

exports.getAllPrescriptions = (req, res) => {
    Medication.find()
        .exec((err, medication) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).json(medication);
        })
}