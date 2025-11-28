
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const asyncHandler = require('../utils/catchAsync'); // CORREGIDO

// El resto del código permanece igual...

// --- GET /api/patients ---
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const patients = await Patient.find({ user: req.user.id }).sort({
      createdAt: -1
    });
    res.json(patients);
  })
);

// --- GET /api/patients/count ---
router.get(
  '/count',
  asyncHandler(async (req, res) => {
    const count = await Patient.countDocuments({ user: req.user.id });
    res.json({ count });
  })
);

// --- GET /api/patients/:id ---
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ msg: 'Paciente no encontrado' });
    }

    if (!patient.user || patient.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Acceso no autorizado' });
    }

    res.json(patient);
  })
);

// --- POST /api/patients ---
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, species, breed, ownerName, ownerPhone } = req.body;
    if (!name || !species || !ownerName) {
      return res
        .status(400)
        .json({
          msg: 'Por favor, incluye nombre, especie y nombre del propietario.'
        });
    }
    const newPatient = new Patient({
      user: req.user.id,
      name,
      species,
      breed,
      ownerName,
      ownerPhone
    });
    const patient = await newPatient.save();
    res.status(201).json(patient);
  })
);

// --- POST /api/patients/:id/medical-records ---
router.post(
  '/:id/medical-records',
  asyncHandler(async (req, res) => {
    const { diagnosis, treatment, notes, type } = req.body;
    if (!diagnosis || !treatment) {
      return res
        .status(400)
        .json({ msg: 'Por favor, incluye diagnóstico y tratamiento.' });
    }
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ msg: 'Paciente no encontrado' });
    }

    if (!patient.user || patient.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Acceso no autorizado' });
    }

    const newMedicalRecord = {
      diagnosis,
      treatment,
      notes: notes || '',
      type: type || 'Consulta'
    };
    patient.medicalHistory.unshift(newMedicalRecord);
    await patient.save();
    res.status(201).json(patient.medicalHistory[0]);
  })
);

module.exports = router;
