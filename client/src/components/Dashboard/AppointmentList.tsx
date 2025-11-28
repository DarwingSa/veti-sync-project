import { Clock, User } from 'lucide-react';
import Link from 'next/link';

interface AppointmentListProps {
    onAddAppointment: () => void;
}

export default function AppointmentList({ onAddAppointment }: AppointmentListProps) {
    const appointments = [
        { id: 1, pet: 'Max', breed: 'Labrador', type: 'Vacunación anual', owner: 'Ana García', time: '10:30 AM', status: 'confirmed' },
        { id: 2, pet: 'Luna', breed: 'Gato Persa', type: 'Control post-operatorio', owner: 'Carlos Ruiz', time: '11:45 AM', status: 'pending' },
        { id: 3, pet: 'Rocky', breed: 'Bulldog', type: 'Problemas digestivos', owner: 'Miguel López', time: '02:15 PM', status: 'confirmed' },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Próximas citas</h3>
                <Link href="/citas" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todas</Link>
            </div>

            <div className="space-y-4">
                {appointments.map((apt) => (
                    <div key={apt.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800/50 transition-colors group">
                        <div className={`w-1 h-12 rounded-full ${apt.status === 'confirmed' ? 'bg-blue-500' : 'bg-cyan-500'}`} />
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                    {apt.pet} <span className="text-slate-400 font-normal">({apt.breed})</span>
                                </h4>
                                <span className="text-xs font-medium px-2 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700">
                                    {apt.time}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{apt.type}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <User className="w-3 h-3" />
                                <span>{apt.owner}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={onAddAppointment} className="w-full mt-6 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                + Agendar nueva cita
            </button>
        </div>
    );
}
