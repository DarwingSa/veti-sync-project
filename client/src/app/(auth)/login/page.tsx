'use client';

import { useState } from 'react';
import Link from 'next/link'; // Importar Link
import { useAuth } from '@/contexts/AuthContext';
import { loginUser } from '@/services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await loginUser(email, password);
      login(response.token);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-cyan-600">VetiSync</h1>
          <p className="mt-2 text-gray-600">Bienvenido de nuevo</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... campos del formulario ... */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50"
            />
          </div>
          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          <div>
            <button type="submit" disabled={isLoading} className="w-full px-4 py-2 font-bold text-white bg-cyan-500 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50">
              {isLoading ? 'Iniciando sesión...' : 'Entrar'}
            </button>
          </div>
        </form>
        {/* Enlace para registrarse */}
        <p className="text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="font-medium text-cyan-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
