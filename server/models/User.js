// server/models/User.js (VERSIÓN DEFINITIVA Y COMPLETA)

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['veterinario', 'admin'],
    default: 'veterinario'
  }
})

// Hook .pre('save'): Se ejecuta ANTES de que un documento 'User' se guarde.
// Su propósito es encriptar la contraseña.
UserSchema.pre('save', async function (next) {
  // Si la contraseña no ha sido modificada (ej. al actualizar el email), no hacemos nada.
  if (!this.isModified('password')) {
    return next()
  }
  // Generamos un 'salt' para hacer el hash más seguro.
  const salt = await bcrypt.genSalt(10)
  // Reemplazamos la contraseña en texto plano con la contraseña hasheada.
  this.password = await bcrypt.hash(this.password, salt)
  next() // Continuamos con el proceso de guardado.
})

// Método personalizado para el Schema: Nos permite añadir funciones a nuestros documentos.
// Su propósito es comparar la contraseña que el usuario ingresa en el login
// con la contraseña hasheada que está en la base de datos.
UserSchema.methods.comparePassword = async function (enteredPassword) {
  // bcrypt.compare se encarga de todo el proceso de forma segura.
  // Devuelve 'true' si coinciden, 'false' si no.
  return await bcrypt.compare(enteredPassword, this.password)
}

// Exportamos el modelo para que pueda ser utilizado en otras partes de la aplicación (como en las rutas).
module.exports = mongoose.model('User', UserSchema)
