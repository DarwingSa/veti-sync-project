'use client';

import { useAuth } from '@/contexts/AuthContext';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AddAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAppointmentAdded: () => void;
}

export default function AddAppointmentModal({ isOpen, onClose, onAppointmentAdded }: AddAppointmentModalProps) {
    const [formData, setFormData] = useState({
        patientId: '',
        date: '',
        time: '',
        reason: '',
        notes: ''
    });
    const [patients, setPatients] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useAuth();

    // Fetch patients for the dropdown
    useEffect(() => {
        if (isOpen && token) {
            fetch('/api/patients', {
                headers: { 'x-auth-token': token }
            })
                .then(res => res.json())
                .then(data => setPatients(data))
                .catch(err => console.error('Error fetching patients:', err));
        }
    }, [isOpen, token]);

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
            // Combine date and time into a single ISO string if needed by backend, 
            // or send as is depending on API requirement. Assuming separate fields for now or ISO.
            // Let's assume the backend expects a 'date' field which is the full datetime.
            const dateTime = new Date(`${formData.date}T${formData.time}`);

            const response = await fetch(`/api/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({
                    patient: formData.patientId,
                    date: dateTime.toISOString(),
                    reason: formData.reason,
                    notes: formData.notes
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Error al agendar la cita');
            }

            onAppointmentAdded();
            onClose();
            setFormData({ patientId: '', date: '', time: '', reason: '', notes: '' });

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
                    <Dialog.Title className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Agendar Nueva Cita</Dialog.Title>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="patientId" className="block text-sm font-bold text-slate-900 dark:text-white">Paciente</label>
                            <select
                                name="patientId"
                                id="patientId"
                                value={formData.patientId}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-slate-900 dark:text-white dark:bg-slate-900 font-medium py-2.5 px-3"
                            >
                                <option value="">Seleccionar paciente</option>
                                {patients.map(p => (
                                    <option key={p._id} value={p._id}>{p.name} ({p.species})</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="date" className="block text-sm font-bold text-slate-900 dark:text-white">Fecha</label>
                                <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-slate-900 dark:text-white dark:bg-slate-900 font-medium py-2.5 px-3" />
                            </div>
                            <div>
                                <label htmlFor="time" className="block text-sm font-bold text-slate-900 dark:text-white">Hora</label>
                                <input type="time" name="time" id="time" value={formData.time} onChange={handleChange} required className="mt-1 block w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-slate-900 dark:text-white dark:bg-slate-900 font-medium py-2.5 px-3" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="reason" className="block text-sm font-bold text-slate-900 dark:text-white">Motivo</label>
                            <input type="text" name="reason" id="reason" value={formData.reason} onChange={handleChange} required placeholder="Ej. Vacunación, Consulta..." className="mt-1 block w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-slate-900 dark:text-white dark:bg-slate-900 font-medium py-2.5 px-3" />
                        </div>

                        <div>
                            <label htmlFor="notes" className="block text-sm font-bold text-slate-900 dark:text-white">Notas (Opcional)</label>
                            <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-xl border-slate-300 dark:border-slate-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-slate-900 dark:text-white dark:bg-slate-900 font-medium py-2.5 px-3" />
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <div className="flex justify-end mt-6">
                            <button type="submit" disabled={isSubmitting} className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 disabled:bg-emerald-300 transition-colors font-medium">
                                {isSubmitting ? 'Agendando...' : 'Agendar Cita'}
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
