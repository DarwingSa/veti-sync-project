'use client';

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
    diagnosis: '',
    treatment: '',
    notes: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const token = localStorage.getItem('veti-sync-token');
    if (!token) {
      setError('No estás autenticado.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/${patientId}/medical-records`, {
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
      setFormData({ diagnosis: '', treatment: '', notes: '' });
      
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
        <button className="flex items-center bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors">
          <PlusCircle className="mr-2 h-5 w-5" />
          Añadir Registro
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-6 shadow-lg focus:outline-none">
          <Dialog.Title className="text-xl font-bold mb-4">Añadir Registro al Historial</Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">Diagnóstico</label>
              <input type="text" name="diagnosis" id="diagnosis" value={formData.diagnosis} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
            </div>
            <div>
              <label htmlFor="treatment" className="block text-sm font-medium text-gray-700">Tratamiento</label>
              <input type="text" name="treatment" id="treatment" value={formData.treatment} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notas (Opcional)</label>
              <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <div className="flex justify-end mt-6">
              <button type="submit" disabled={isSubmitting} className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 disabled:bg-cyan-300">
                {isSubmitting ? 'Guardando...' : 'Guardar Registro'}
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none" aria-label="Close">
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
