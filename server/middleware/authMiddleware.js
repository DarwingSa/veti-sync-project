// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  // Obtener el token del header
  const token = req.header('x-auth-token')

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso denegado' })
  }

  // Verificar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user // Agregamos el usuario del payload a la request
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Token no es válido' })
  }
}
