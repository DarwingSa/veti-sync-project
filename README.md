# VetiSync - Sistema de Gestión Veterinaria

VetiSync es una aplicación web integral diseñada para facilitar la administración de clínicas veterinarias. Permite a los veterinarios y administradores gestionar pacientes, propietarios y registros médicos de manera eficiente y centralizada.

## 🚀 Características Principales

*   **Gestión de Usuarios:** Registro e inicio de sesión seguro para veterinarios y personal de la clínica.
*   **Gestión de Pacientes:**
    *   Registro de nuevos pacientes (Mascotas).
    *   Información detallada: Nombre, Especie, Raza.
    *   Datos del Propietario: Nombre y Teléfono.
*   **Historial Médico:**
    *   Seguimiento de consultas.
    *   Registro de diagnósticos, tratamientos y notas adicionales.
    *   Historial cronológico por paciente.
*   **Dashboard:** Visualización rápida de estadísticas y pacientes recientes.

## 🛠️ Tecnologías Utilizadas

El proyecto utiliza una arquitectura **MERN** (MongoDB, Express, React/Next.js, Node.js) dividida en cliente y servidor.

### Frontend (`/client`)
*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Lenguaje:** TypeScript
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
*   **Iconos:** Lucide React (inferido) / SVGs

### Backend (`/server`)
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Base de Datos:** MongoDB
*   **ODM:** Mongoose
*   **Autenticación:** JWT (JSON Web Tokens) - *Manejado a través de `authMiddleware`*

## 📂 Estructura del Proyecto

```bash
├── client/                 # Aplicación Frontend (Next.js)
│   ├── src/
│   │   ├── app/            # Rutas y Páginas (App Router)
│   │   ├── components/     # Componentes Reutilizables (Modales, Sidebar, Cards)
│   │   ├── contexts/       # Gestión de estado (AuthContext)
│   │   └── services/       # Comunicación con el API
│   └── public/             # Archivos estáticos
│
├── server/                 # API Backend (Express)
│   ├── models/             # Modelos de Mongoose (User, Patient)
│   ├── routes/             # Definición de endpoints (auth, patients)
│   ├── middleware/         # Middlewares (auth, manejo de errores)
│   └── utils/              # Utilidades
│
└── package.json            # Configuración raíz
```

## ⚙️ Configuración e Instalación

### Prerrequisitos
*   Node.js (v18 o superior recomendado)
*   MongoDB (Instancia local o Atlas)

### 1. Configuración del Backend

Navega al directorio del servidor e instala las dependencias:

```bash
cd server
npm install
```

Crea un archivo `.env` en la carpeta `server/` con las siguientes variables (ejemplo):

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/vetisync
JWT_SECRET=tu_clave_secreta_super_segura
```

### 2. Configuración del Frontend

Navega al directorio del cliente e instala las dependencias:

```bash
cd client
npm install
```

Crea un archivo `.env.local` en la carpeta `client/` si es necesario para definir la URL del API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## ▶️ Ejecución

### Iniciar el Servidor (Backend)

```bash
cd server
npm run dev
# O node server.js
```
El servidor correrá por defecto en `http://localhost:3001` (o el puerto definido).

### Iniciar el Cliente (Frontend)

```bash
cd client
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

## 📡 API Endpoints Principales

### Autenticación (`/api/auth`)
*   `POST /register`: Registrar nuevo usuario.
*   `POST /login`: Iniciar sesión.

### Pacientes (`/api/patients`)
*   `GET /`: Listar todos los pacientes (requiere auth).
*   `POST /`: Crear un nuevo paciente.
*   `GET /:id`: Obtener detalles de un paciente.
*   `PUT /:id`: Actualizar paciente.
*   `DELETE /:id`: Eliminar paciente.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para mejoras y correcciones.