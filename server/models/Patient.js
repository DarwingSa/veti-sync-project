const mongoose = require('mongoose')

// Sub-esquema para una entrada del historial médico
const MedicalRecordSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ['Consulta', 'Vacunación', 'Cirugía', 'Estudio', 'Otro'],
    default: 'Consulta'
  },
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
  notes: { type: String }
})

const PatientSchema = new mongoose.Schema(
  {
    // Campo que asocia el paciente con un usuario (veterinario/clínica)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String },
    ownerName: { type: String, required: true },
    ownerPhone: { type: String },
    medicalHistory: [MedicalRecordSchema]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Patient', PatientSchema)
