'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PawPrint, User, Phone } from 'lucide-react';
import AddMedicalRecordModal from '../../../../components/AddMedicalRecordModal';

// --- Interfaces de Tipos ---
interface MedicalRecord {
  _id: string;
  date: string;
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

// --- Componente Principal ---
export default function PatientDetailPage() {
  // 1. DEFINICIÓN DE ESTADOS
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  // 2. FUNCIÓN PARA OBTENER DATOS (MEMORIZADA CON USECALLBACK)
  const fetchPatient = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Limpiar errores previos

    const token = localStorage.getItem('veti-sync-token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/${id}`, {
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
  }, [id, router]);

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
    <div>
      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
        <h1 className="text-4xl font-bold">{patient.name}</h1>
        <div className="flex flex-wrap items-center text-gray-600 mt-2 gap-x-4 gap-y-2">
          <div className="flex items-center">
            <PawPrint className="mr-2 h-5 w-5" /> {patient.species} - {patient.breed}
          </div>
          <div className="flex items-center">
            <User className="mr-2 h-5 w-5" /> {patient.ownerName}
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 h-5 w-5" /> {patient.ownerPhone}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Historial Médico</h2>
          <AddMedicalRecordModal patientId={patient._id} onRecordAdded={fetchPatient} />
        </div>
        <div className="space-y-4">
          {patient.medicalHistory.length > 0 ? (
            patient.medicalHistory.map((record) => (
              <div key={record._id} className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-bold text-gray-800">{new Date(record.date).toLocaleDateString()}</p>
                <p className="mt-2"><span className="font-semibold text-gray-600">Diagnóstico:</span> {record.diagnosis}</p>
                <p><span className="font-semibold text-gray-600">Tratamiento:</span> {record.treatment}</p>
                {record.notes && <p className="mt-1"><span className="font-semibold text-gray-600">Notas:</span> {record.notes}</p>}
              </div>
            ))
          ) : (
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <p className="text-gray-500">No hay registros médicos para este paciente.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
