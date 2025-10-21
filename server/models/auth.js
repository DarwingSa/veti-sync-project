// server/routes/auth.js
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

// --- RUTA DE REGISTRO (opcional, para crear usuarios) ---
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' })
    }
    user = new User({ name, email, password })
    await user.save()
    res.status(201).json({ msg: 'Usuario registrado exitosamente' })
  } catch (error) {
    // ----> ¡AQUÍ ESTÁ LA LÍNEA MÁS IMPORTANTE! <----
    console.error('*** ERROR DETALLADO DE REGISTRO ***:', error)
    res.status(500).send('Error en el servidor')
  }
})

// --- RUTA DE LOGIN ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' })
    }

    // Si las credenciales son correctas, crear y firmar el token
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '8h' }, // El token expira en 8 horas
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (error) {}
})

module.exports = router
