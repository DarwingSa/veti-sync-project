
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, PawPrint, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // 1. Importar useAuth

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth(); // 2. Obtener usuario y función logout

  const linkClasses = (path: string) => {
    const isActive = pathname.startsWith(path) && path !== '/' || pathname === path;
    return `flex items-center p-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100'
    }`;
  };

  // Función para obtener las iniciales del usuario
  const getInitials = (name: string | undefined) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <aside className="flex flex-col w-64 h-screen bg-white border-r overflow-y-auto">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-center text-cyan-500">VetiSync</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        <Link href="/dashboard" className={linkClasses('/dashboard')}>
          <LayoutDashboard className="mr-3" /> Dashboard
        </Link>
        <Link href="/citas" className={linkClasses('/citas')}>
          <Calendar className="mr-3" /> Citas
        </Link>
        <Link href="/pacientes" className={linkClasses('/pacientes')}>
          <PawPrint className="mr-3" /> Pacientes
        </Link>
      </nav>
      
      {/* Perfil de Usuario y Logout */}
      <div className="p-4 border-t mt-auto">
        {user && (
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold">
              {getInitials(user.name)}
            </div>
            <div className="ml-3">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        )}
        <button 
          onClick={logout} // 4. Llamar a logout al hacer clic
          className="w-full flex items-center justify-center p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="mr-3" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
