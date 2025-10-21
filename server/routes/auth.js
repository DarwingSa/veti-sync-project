// server/routes/auth.js (CORREGIDO EL CATCH VACÍO)
const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()
const asyncHandler = require('../utils/errorHandler')

// --- RUTA DE REGISTRO ---
router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' })
    }
    user = new User({ name, email, password })
    await user.save()
    res.status(201).json({ msg: 'Usuario registrado exitosamente' })
  })
)

// --- RUTA DE LOGIN ---
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' })
    }

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
      { expiresIn: '8h' },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  })
)

module.exports = router
