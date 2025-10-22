
// Define la forma de la respuesta esperada del API de login y registro
interface AuthResponse {
  status: string;
  token: string;
}

/**
 * Llama al endpoint de la API para iniciar sesión.
 * @param email - El email del usuario.
 * @param password - La contraseña del usuario.
 * @returns La respuesta de la API, que incluye el token.
 * @throws Lanza un error con el mensaje del servidor si el login falla.
 */
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error al iniciar sesión. Por favor, inténtalo de nuevo.');
  }

  return data;
};

/**
 * Llama al endpoint de la API para registrar un nuevo usuario.
 * @param name - El nombre del usuario.
 * @param email - El email del usuario.
 * @param password - La contraseña del usuario.
 * @returns La respuesta de la API, que incluye el token.
 * @throws Lanza un error con el mensaje del servidor si el registro falla.
 */
export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error en el registro. Por favor, inténtalo de nuevo.');
  }

  return data;
};
