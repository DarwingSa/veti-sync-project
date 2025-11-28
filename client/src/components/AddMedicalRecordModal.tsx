'use client';

import { useAuth } from '@/contexts/AuthContext';
import * as Dialog from '@radix-ui/react-dialog';
import { X, PlusCircle } from 'lucide-react';
import { useState } from 'react';

interface AddMedicalRecordModalProps {
  patientId: string;
  onRecordAdded: () => void;
}

export default function AddMedicalRecordModal({ patientId, onRecordAdded }: AddMedicalRecordModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Consulta',
    diagnosis: '',
    treatment: '',
    notes: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!token) {
      setError('No estás autenticado.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/patients/${patientId}/medical-records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al crear el registro médico');
      }

      onRecordAdded();
      setIsOpen(false);
      setFormData({ type: 'Consulta', diagnosis: '', treatment: '', notes: '' });

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="flex items-center bg-cyan-600 text-white px-4 py-2 rounded-xl hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-600/20 active:scale-95 font-medium">
          <PlusCircle className="mr-2 h-5 w-5" />
          Añadir Registro
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-900/50 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-40" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-2xl focus:outline-none z-50 border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold text-slate-900 dark:text-white">Nuevo Registro Médico</Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                <X className="w-6 h-6" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label htmlFor="type" className="block text-sm font-bold text-slate-900 dark:text-white mb-1">Tipo de Registro</label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 py-2.5 px-3 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                >
                  <option value="Consulta">Consulta General</option>
                  <option value="Vacunación">Vacunación</option>
                  <option value="Cirugía">Cirugía</option>
                  <option value="Estudio">Estudio / Análisis</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="diagnosis" className="block text-sm font-bold text-slate-900 dark:text-white mb-1">Diagnóstico / Motivo</label>
                <input
                  type="text"
                  name="diagnosis"
                  id="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Gastroenteritis leve"
                  className="w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 py-2.5 px-3 text-slate-900 dark:text-white dark:bg-slate-900 font-medium placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="treatment" className="block text-sm font-bold text-slate-900 dark:text-white mb-1">Tratamiento / Procedimiento</label>
                <input
                  type="text"
                  name="treatment"
                  id="treatment"
                  value={formData.treatment}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Dieta blanda, hidratación..."
                  className="w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 py-2.5 px-3 text-slate-900 dark:text-white dark:bg-slate-900 font-medium placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-bold text-slate-900 dark:text-white mb-1">Notas Adicionales</label>
                <textarea
                  name="notes"
                  id="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Observaciones, peso, temperatura..."
                  className="w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 py-2.5 px-3 text-slate-900 dark:text-white dark:bg-slate-900 font-medium placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100 dark:border-slate-700">
              <Dialog.Close asChild>
                <button type="button" className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium transition-colors">
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-cyan-600 text-white px-6 py-2.5 rounded-xl hover:bg-cyan-700 disabled:bg-cyan-300 disabled:cursor-not-allowed font-medium shadow-lg shadow-cyan-600/20 transition-all active:scale-95"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Registro'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
