// RUTA: src/app/(app)/pacientes/page.tsx (CORREGIDO Y CON TABLA)
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AddPatientModal from '../../../components/AddPatientModal';

// Interfaz para el objeto paciente
interface Patient {
  _id: string;
  name: string;
  species: string;
  ownerName: string;
  createdAt: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    const token = localStorage.getItem('veti-sync-token');
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients`, {
        headers: { 'x-auth-token': token },
      });
      if (!response.ok) throw new Error('Error al cargar los pacientes');
      const data = await response.json();
      setPatients(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Pacientes</h1>
        <AddPatientModal onPatientAdded={fetchPatients} />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especie</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propietario</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Registro</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Ver Detalles</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading && (
              <tr>
                <td colSpan={5} className="text-center py-4">Cargando pacientes...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-red-500">{error}</td>
              </tr>
            )}
            {!isLoading && !error && patients.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">No hay pacientes registrados.</td>
              </tr>
            )}
            {!isLoading && !error && patients.map((patient) => (
              <tr key={patient._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.species}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.ownerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{new Date(patient.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/pacientes/${patient._id}`} className="text-cyan-600 hover:text-cyan-900">
                    Ver Detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
