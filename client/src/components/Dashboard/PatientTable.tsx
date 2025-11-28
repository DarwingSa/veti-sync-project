import Link from 'next/link';
import { Eye, Edit } from 'lucide-react';

const patients = [
    {
        id: 1,
        pet: "Max",
        breed: "Golden Retriever",
        owner: "Carlos Ruiz",
        email: "carlos.ruiz@email.com",
        lastVisit: "26 Nov, 2024",
        status: "En Tratamiento",
        statusColor: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
        id: 2,
        pet: "Luna",
        breed: "Siames",
        owner: "Ana Garcia",
        email: "ana.garcia@email.com",
        lastVisit: "25 Nov, 2024",
        status: "Recuperado",
        statusColor: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
    },
    {
        id: 3,
        pet: "Rocky",
        breed: "Bulldog Frances",
        owner: "Luis Torres",
        email: "luis.torres@email.com",
        lastVisit: "24 Nov, 2024",
        status: "Pendiente",
        statusColor: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
    },
    {
        id: 4,
        pet: "Coco",
        breed: "Poodle",
        owner: "Maria Rodriguez",
        email: "maria.rodriguez@email.com",
        lastVisit: "23 Nov, 2024",
        status: "En Tratamiento",
        statusColor: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
        id: 5,
        pet: "Simba",
        breed: "Persa",
        owner: "Juan Perez",
        email: "juan.perez@email.com",
        lastVisit: "22 Nov, 2024",
        status: "Recuperado",
        statusColor: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
    }
];

export default function PatientTable() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                            <th className="pl-6 py-3">Paciente</th>
                            <th className="pb-3">Propietario</th>
                            <th className="pb-3">Última Visita</th>
                            <th className="pb-3">Estado</th>
                            <th className="pb-3 text-right pr-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                        {patients.map((patient) => (
                            <tr key={patient.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                                <td className="py-4 pl-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                                            {patient.pet[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{patient.pet}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{patient.breed}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{patient.owner}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{patient.email}</p>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <p className="text-sm text-slate-600 dark:text-slate-300">{patient.lastVisit}</p>
                                </td>
                                <td className="py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${patient.statusColor}`}>
                                        {patient.status}
                                    </span>
                                </td>
                                <td className="py-4 text-right pr-2">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/pacientes/${patient.id}`} className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => alert(`Editar paciente: ${patient.pet}`)}
                                            className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
