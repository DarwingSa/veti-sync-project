// RUTA: src/app/(app)/pacientes/page.tsx (CORREGIDO Y CON TABLA)
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth(); // Use token from context

  const fetchPatients = useCallback(async () => {
    if (!token) return; // Wait for token

    setIsLoading(true);
    try {
      const response = await fetch(`/api/patients`, {
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
  }, [token]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header with Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Pacientes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Gestiona el historial y datos de tus pacientes.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar paciente..."
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none w-64 shadow-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
            <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-cyan-600 text-white px-5 py-2.5 rounded-xl hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-600/20 active:scale-95 font-medium"
          >
            <PlusCircle className="w-5 h-5" />
            Nuevo Paciente
          </button>
        </div>
      </div>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPatientAdded={fetchPatients}
      />

      {/* Pro Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-700">
            <thead className="bg-slate-50/50 dark:bg-slate-900/50">
              <tr>
                <th scope="col" className="px-8 py-5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Paciente</th>
                <th scope="col" className="px-8 py-5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Especie</th>
                <th scope="col" className="px-8 py-5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Propietario</th>
                <th scope="col" className="px-8 py-5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Registro</th>
                <th scope="col" className="relative px-8 py-5">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-100 dark:divide-slate-700">
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-500 dark:text-slate-400">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-red-500 bg-red-50/50 dark:bg-red-900/20">
                    {error}
                  </td>
                </tr>
              )}
              {!isLoading && !error && patients.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
                        <PlusCircle className="w-8 h-8 text-slate-300 dark:text-slate-500" />
                      </div>
                      <p className="text-lg font-medium text-slate-900 dark:text-white">No hay pacientes aún</p>
                      <p className="text-sm mt-1">Comienza añadiendo el primer paciente a tu clínica.</p>
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading && !error && patients.map((patient) => (
                <tr key={patient._id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-lg mr-4">
                        {patient.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-white text-base">{patient.name}</div>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                      {patient.species}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-slate-600 dark:text-slate-300 font-medium">{patient.ownerName}</td>
                  <td className="px-8 py-5 whitespace-nowrap text-slate-500 dark:text-slate-400 text-sm">
                    {new Date(patient.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/pacientes/${patient._id}`}
                      className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 font-semibold hover:underline decoration-2 underline-offset-2 transition-all opacity-0 group-hover:opacity-100"
                    >
                      Ver Ficha
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
