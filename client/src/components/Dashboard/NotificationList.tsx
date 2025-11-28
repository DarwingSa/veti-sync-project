import { Calendar, FlaskConical, AlertCircle, MessageSquare } from 'lucide-react';

export default function NotificationList() {
    const notifications = [
        {
            id: 1,
            title: 'Nueva cita programada',
            desc: 'Tobby - Revisión general, mañana a las 9:00 AM',
            time: 'Hace 10 minutos',
            icon: Calendar,
            iconColor: 'text-blue-600',
            iconBg: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
            id: 2,
            title: 'Resultados de laboratorio',
            desc: 'Resultados disponibles para Luna (Gato Persa)',
            time: 'Hace 30 minutos',
            icon: FlaskConical,
            iconColor: 'text-cyan-600',
            iconBg: 'bg-cyan-50 dark:bg-cyan-900/20'
        },
        {
            id: 3,
            title: 'Inventario bajo',
            desc: 'Antibiótico Amoxicilina 250mg por debajo del mínimo',
            time: 'Hace 2 horas',
            icon: AlertCircle,
            iconColor: 'text-slate-600',
            iconBg: 'bg-slate-100 dark:bg-slate-800'
        },
        {
            id: 4,
            title: 'Nuevo mensaje',
            desc: 'Ana García pregunta sobre la dieta de Max',
            time: 'Hace 3 horas',
            icon: MessageSquare,
            iconColor: 'text-indigo-600',
            iconBg: 'bg-indigo-50 dark:bg-indigo-900/20'
        }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Notificaciones</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todas</button>
            </div>

            <div className="space-y-6">
                {notifications.map((notif) => {
                    const Icon = notif.icon;
                    return (
                        <div key={notif.id} className="flex gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.iconBg}`}>
                                <Icon className={`w-5 h-5 ${notif.iconColor}`} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{notif.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                                    {notif.desc}
                                </p>
                                <span className="text-[10px] text-slate-400 font-medium mt-1 block">{notif.time}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="w-full mt-8 text-xs font-medium text-slate-400 hover:text-blue-600 transition-colors">
                Ver todas las notificaciones
            </button>
        </div>
    );
}
