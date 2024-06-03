const controller = require("../controllers/medication.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/medication/prescribe", controller.presribe);

    app.post("/api/medication/getMedicationForUser", controller.getMedicationForUser);

    app.get("/api/medication/getAllPrescriptions", controller.getAllPrescriptions);

    app.post("/api/medication/deletePrescription", controller.deleteMedication);

};