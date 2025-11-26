VetiSync - Plataforma de Gestión de Clínicas Veterinarias
VetiSync es una aplicación web full-stack moderna diseñada para la gestión integral de clínicas veterinarias. Cuenta con un backend robusto construido con Node.js/Express y un frontend interactivo y responsivo con Next.js.

Características
Dashboard Interactivo: Métricas clave de la clínica.
Historial Médico Digital: Gestión completa de los pacientes y sus consultas.
Autenticación Segura: Sistema basado en JWT con roles de usuario.
API RESTful: Backend que sirve los datos de forma segura.
Interfaz Moderna: Frontend construido con Next.js y estilizado con Tailwind CSS.
Requisitos previos
Para ejecutar este proyecto localmente, necesitarás tener instalado lo siguiente:

Node.js (versión 20.xo superior)
MongoDB (la base de datos)
Un gestor de paquetes como npm(que viene con Node.js)
Guía de Instalación y Ejecución
Sigue estos pasos para poner en marcha el proyecto en tu máquina local (por ejemplo, en Visual Studio Code):

1. Clonar el Repositorio
Abre una terminal y clona el repositorio de GitHub:

git clone https://github.com/DarwingSa/veti-sync-app.git
cd veti-sync-app
2. Configurar el Backend
El backend requiere variables de entorno para conectarse a la base de datos y gestionar la autenticación.

a. Navegar a la carpeta del servidor:

cd server
b. Instale las dependencias del servidor:

npm install
do. Crea el archivo de entorno: Crea un archivo llamado .envdentro de la carpeta server/y añade el siguiente contenido. Este archivo guarda tus "secretos".

# Puerto para el servidor Express
PORT=5000

# Secreto para firmar los JSON Web Tokens (JWT)
JWT_SECRET=tu_secreto_super_secreto_aqui

# Cadena de conexión a tu base de datos MongoDB local
MONGO_URI=mongodb://localhost:27017/vetisync-db
3. Configurar el Frontend
a. Abra una nueva terminal. Navega de nuevo a la raíz del proyecto y luego a la carpeta del cliente:

cd client 
# (Si ya estás en la carpeta 'server', primero haz 'cd ..' para volver a la raíz)
b. Instale las dependencias del cliente:

npm install
4. Ejecutar la Aplicación
Ahora que todo está configurado, necesitas tener dos terminales abiertos para ejecutar la aplicación: una para el backend y una para el frontend.

a. En la terminal del backend ( /server):

Asegúrese de que su servicio de MongoDB esté funcionando.
Inicia el servidor:
npm start
Deberías ver un mensaje como Servidor corriendo en el puerto 5000y Conectado a MongoDB.

b. En la terminal del frontend ( /client):

Inicia la aplicación de Next.js:
npm run dev
Deberías ver un mensaje indicando que el servidor está listo en http://localhost:3000.

¡Y eso es todo! Ahora puedes abrir http://localhost:3000en tu navegador para ver y usar la aplicación.
