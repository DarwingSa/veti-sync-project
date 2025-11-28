// server/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const authMiddleware = require('./middleware/authMiddleware');
const { errorHandler, ApiError } = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

const morgan = require('morgan'); // Import morgan

// --- Middlewares Globales ---
const corsOptions = {
  origin: 'http://localhost:3000', // Origen del cliente
  credentials: true, // Allow cookies if needed
  optionsSuccessStatus: 200 
};

app.use(helmet());
app.use(cors(corsOptions)); // Usar opciones de CORS
app.use(morgan('dev')); // Use morgan for logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Conexión a la Base de Datos ---
if (process.env.MONGO_URI && process.env.MONGO_URI.startsWith('mongodb')) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));
} else {
  console.warn('MONGO_URI no está definida o es inválida. Saltando la conexión a la base de datos.');
}

// --- Ruta Raíz ---
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Bienvenido al API de VetiSync. El servidor está operativo.',
  });
});

// --- Definición de Rutas ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/patients', authMiddleware, require('./routes/patients'));

// --- Middleware para rutas no encontradas ---
app.use((req, res, next) => {
  next(new ApiError(`No se puede encontrar ${req.originalUrl} en este servidor`, 404));
});

// --- Middleware de Manejo de Errores Global ---
app.use(errorHandler);

// --- Iniciar el Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
