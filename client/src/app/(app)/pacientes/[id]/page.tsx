'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PawPrint, User, Phone } from 'lucide-react';
import AddMedicalRecordModal from '../../../../components/AddMedicalRecordModal';

// --- Interfaces de Tipos ---
interface MedicalRecord {
  _id: string;
  date: string;
  type?: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
}

interface Patient {
  _id: string;
  name: string;
  species: string;
  breed: string;
  ownerName: string;
  ownerPhone: string;
  medicalHistory: MedicalRecord[];
}

export default function PatientDetailPage() {
  // 1. DEFINICIÓN DE ESTADOS
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };
  const { token } = useAuth();

  // 2. FUNCIÓN PARA OBTENER DATOS (MEMORIZADA CON USECALLBACK)
  const fetchPatient = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null); // Limpiar errores previos

    try {
      const response = await fetch(`/api/patients/${id}`, {
        headers: { 'x-auth-token': token },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 404) {
          router.push('/pacientes');
        } else {
          throw new Error('No se pudieron cargar los datos del paciente.');
        }
        return;
      }
      const data = await response.json();
      setPatient(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, router, token]);

  // 3. EFECTO PARA LLAMAR A LA FUNCIÓN AL CARGAR
  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id, fetchPatient]);

  // 4. LÓGICA DE RENDERIZADO CONDICIONAL (EN EL CUERPO DEL COMPONENTE)
  if (isLoading) {
    return <div className="text-center mt-10">Cargando paciente...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  if (!patient) {
    return (
      <div className="text-center mt-10">
        <p>No se encontró el paciente o no tienes permiso para verlo.</p>
        <Link href="/pacientes" className="text-cyan-600 hover:underline mt-2 inline-block">
          Volver a la lista
        </Link>
      </div>
    );
  }

  // 5. RENDERIZADO FINAL (SOLO SI HAY DATOS)
  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header Profile */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center text-4xl font-bold text-cyan-600 shadow-inner">
            {patient.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{patient.name}</h1>
                <p className="text-slate-500 text-lg">{patient.species} • {patient.breed}</p>
              </div>
              <AddMedicalRecordModal patientId={patient._id} onRecordAdded={fetchPatient} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Propietario</p>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <User className="w-4 h-4 text-cyan-500" />
                  {patient.ownerName}
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Contacto</p>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Phone className="w-4 h-4 text-cyan-500" />
                  {patient.ownerPhone}
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Historial</p>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <PawPrint className="w-4 h-4 text-cyan-500" />
                  {patient.medicalHistory.length} registros
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Quick Stats / Info (Placeholder for future expansion) */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Resumen Rápido</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Última Visita</span>
                <span className="font-medium text-slate-900">
                  {patient.medicalHistory.length > 0
                    ? new Date(patient.medicalHistory[0].date).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="text-slate-500 text-sm">Estado</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">Activo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Historial Clínico</h2>
            <div className="flex gap-2">
              <select className="bg-white border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none">
                <option>Todos</option>
                <option>Consultas</option>
                <option>Vacunas</option>
                <option>Cirugías</option>
              </select>
            </div>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {patient.medicalHistory.length > 0 ? (
              patient.medicalHistory.map((record) => (
                <div key={record._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Icon Node */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 group-[.is-active]:bg-cyan-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <PawPrint className="w-5 h-5" />
                  </div>

                  {/* Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${record.type === 'Vacunación' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        record.type === 'Cirugía' ? 'bg-red-50 text-red-700 border-red-100' :
                          'bg-cyan-50 text-cyan-700 border-cyan-100'
                        }`}>
                        {record.type || 'Consulta'}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {new Date(record.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">{record.diagnosis}</h4>
                    <p className="text-slate-600 text-sm mb-3">{record.treatment}</p>
                    {record.notes && (
                      <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-500 italic">
                        &quot;{record.notes}&quot;
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 ml-12 md:ml-0 md:col-span-2">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PawPrint className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">Historial vacío</h3>
                <p className="text-slate-500 text-sm mt-1">No hay registros médicos para este paciente aún.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
