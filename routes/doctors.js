// routes/doctors.js

const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.route('/').get((req, res) => {
    Doctor.find()
        .then(doctors =>
            res.json(doctors))
        .catch(err =>
            res.status(400)
                .json('Error: ' + err));
});

// Add new doctor
router.route('/add')
    .post((req, res) => {
        const { name, specialty } = req.body;

        const newDoctor =
            new Doctor({ name, specialty });

        newDoctor.save()
            // Return the savedDoctor object
            .then(savedDoctor =>
                res.json(savedDoctor))
            .catch(
                err =>
                    res.status(400)
                        .json('Error: ' + err));
    });


// Update doctor data
router.route('/update/:id')
    .post((req, res) => {
        Doctor.findById(req.params.id)
            .then(doctor => {
                if (!doctor) {
                    return res.status(404)
                        .json('Doctor not found');
                }

                doctor.name = req.body.name;
                doctor.specialty = req.body.specialty;

                doctor.save()
                    .then(() => res.json('Doctor updated!'))
                    .catch(err => res.status(400)
                        .json('Error: ' + err));
            })
            .catch(err => res.status(400)
                .json('Error: ' + err));
    });

// Delete doctor by ID
router.route('/delete/:id').delete((req, res) => {
    Doctor.findByIdAndDelete(req.params.id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404)
                    .json('Doctor not found');
            }
            res.json('Doctor deleted!');
        })
        .catch(err => res.status(400)
            .json('Error: ' + err));
});


//search engine for doctor data
//const express = require('express');
//const Doctor = require('../models/Doctor');

// Search doctors by query
router.get('/search', async (req, res) => {
  const { keyword } = req.query;
  const regex = new RegExp(keyword, 'i'); // i = case-insensitive

  try {
    const results = await Doctor.find({
      $or: [
        { name: { $regex: regex } },
        { specialty: { $regex: regex } }
      ]
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
