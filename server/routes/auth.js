
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const { ApiError } = require('../utils/errorHandler');

const router = express.Router();

// Función para firmar el token
const signToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  });
};


// --- RUTA DE REGISTRO ---
router.post('/register', catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validar que todos los campos necesarios estén presentes
  if (!name || !email || !password) {
    return next(new ApiError('Por favor, proporciona nombre, email y contraseña', 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError('Un usuario con este email ya existe', 409)); // 409 Conflict
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  const token = signToken(newUser);

  res.status(201).json({
    status: 'success',
    token,
    message: 'Usuario registrado exitosamente.',
  });
}));

// --- RUTA DE LOGIN ---
router.post('/login', catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError('Por favor, proporciona email y contraseña', 400));
  }

  // Buscar el usuario y seleccionar explícitamente la contraseña para poder compararla
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return next(new ApiError('Email o contraseña incorrectos', 401)); // 401 Unauthorized
  }

  const token = signToken(user);


  res.json({
    status: 'success',
    token,
  });
}));

module.exports = router;
