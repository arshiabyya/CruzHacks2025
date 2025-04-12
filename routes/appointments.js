// routes/appointments.js

const express = require('express');
const router = express.Router();
const Appointments =
    require('../models/Appointment');

// Get all appointments
router.route('/').get((req, res) => {
    Appointments.find()
        .then(appointments =>
            res.json(appointments))
        .catch(err =>
            res.status(400).json('Error: ' + err));
});

// Add new appointment
router.route('/add').post((req, res) => {
    const { patientName, doctorName, date } = req.body;
    const newAppointment =
        new Appointments({ patientName, doctorName, date });

    newAppointment.save()
        .then(savedAppointment => res.json(savedAppointment))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update appointment data
router.route('/update/:id').post((req, res) => {
    Appointments.findById(req.params.id)
        .then(appointment => {
            appointment.patientName =
                req.body.patientName;
            appointment.doctorName =
                req.body.doctorName;
            appointment.date =
                req.body.date;

            appointment.save()
                .then(
                    () =>
                        res.json('Appointment updated!'))
                .catch(
                    err => res.status(400)
                        .json('Error: ' + err));
        })
        .catch(
            err => res.status(400)
                .json('Error: ' + err));
});

// Delete appointment
router.route('/delete/:id')
    .delete((req, res) => {
        Appointments.findByIdAndDelete(req.params.id)
            .then(
                () => res
                    .json('Appointment deleted.'))
            .catch(
                err => res
                    .status(400).json('Error: ' + err));
    });

module.exports = router;
