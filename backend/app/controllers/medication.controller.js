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

exports.deleteMedication = (req, res) => {
    const medicationId = req.body.id;

    // Verificați dacă id-ul a fost furnizat în corpul cererii
    if (!medicationId) {
        return res.status(400).send({ message: 'Medication ID is required' });
    }

    Medication.deleteOne({ _id: medicationId })
        .exec((err, result) => {
            if (err) {
                return res.status(500).send({ message: err.message || 'An error occurred while deleting the medication' });
            }

            // Verificați dacă a fost șters un document
            if (result.deletedCount === 0) {
                return res.status(404).send({ message: 'Medication not found' });
            }

            // Trimiteți un răspuns de succes
            res.status(200).send({ message: 'Medication deleted successfully' });
        });
};