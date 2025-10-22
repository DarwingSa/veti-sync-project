
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si la carga ha terminado y no hay usuario, redirigir a login
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [isLoading, user, router]);

  // Mientras carga, puedes mostrar un spinner o simplemente nada
  if (isLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        {/* Aquí podrías poner un componente de Spinner más elaborado */}
        <p>Cargando...</p>
      </div>
    );
  }

  // Si el usuario está autenticado, renderiza el contenido protegido
  return <>{children}</>;
}
