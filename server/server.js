// server/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares Globales ---
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Conexión a la Base de Datos ---
if (process.env.MONGO_URI && process.env.MONGO_URI.startsWith('mongodb')) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));
} else {
  console.warn('MONGO_URI no está definida o es inválida. Saltando la conexión a la base de datos.');
}

// --- Definición de Rutas ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', authMiddleware, require('./routes/patients'));

// --- Middleware de Manejo de Errores ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

// --- Iniciar el Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
