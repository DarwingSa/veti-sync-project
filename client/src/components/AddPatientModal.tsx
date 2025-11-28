// RUTA: src/components/AddPatientModal.tsx (CORREGIDO)

'use client';

import { useAuth } from '@/contexts/AuthContext';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';

// Definimos una 'prop' para que el componente padre sepa cuándo se añadió un paciente
interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPatientAdded: () => void;
}

export default function AddPatientModal({ isOpen, onClose, onPatientAdded }: AddPatientModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    ownerName: '',
    ownerPhone: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch(`/api/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al crear el paciente');
      }

      onPatientAdded();
      onClose();
      setFormData({ name: '', species: '', breed: '', ownerName: '', ownerPhone: '' });

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
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-40" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl focus:outline-none z-50 border border-slate-100 dark:border-slate-800">
          <Dialog.Title className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Añadir Nuevo Paciente</Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos del formulario... */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-900 dark:text-white">Nombre de la mascota</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-slate-900 dark:text-white dark:bg-slate-900 font-medium py-2.5 px-3" />
            </div>
            <div>
              <label htmlFor="species" className="block text-sm font-bold text-slate-900 dark:text-white">Especie</label>
              <input type="text" name="species" id="species" value={formData.species} onChange={handleChange} required className="mt-1 block w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-slate-900 dark:text-white dark:bg-slate-900 font-medium py-2.5 px-3" />
            </div>
            <div>
              <label htmlFor="breed" className="block text-sm font-bold text-slate-900 dark:text-white">Raza</label>
              <input type="text" name="breed" id="breed" value={formData.breed} onChange={handleChange} className="mt-1 block w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-slate-900 dark:text-white dark:bg-slate-900 font-medium py-2.5 px-3" />
            </div>
            <div>
              <label htmlFor="ownerName" className="block text-sm font-bold text-slate-900 dark:text-white">Nombre del propietario</label>
              <input type="text" name="ownerName" id="ownerName" value={formData.ownerName} onChange={handleChange} required className="mt-1 block w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-slate-900 dark:text-white dark:bg-slate-900 font-medium py-2.5 px-3" />
            </div>
            <div>
              <label htmlFor="ownerPhone" className="block text-sm font-bold text-slate-900 dark:text-white">Teléfono del propietario</label>
              <input type="text" name="ownerPhone" id="ownerPhone" value={formData.ownerPhone} onChange={handleChange} className="mt-1 block w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-slate-900 dark:text-white dark:bg-slate-900 font-medium py-2.5 px-3" />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-end mt-6">
              <button type="submit" disabled={isSubmitting} className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 disabled:bg-cyan-300 transition-colors">
                {isSubmitting ? 'Guardando...' : 'Guardar Paciente'}
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 focus:outline-none transition-colors" aria-label="Close">
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
