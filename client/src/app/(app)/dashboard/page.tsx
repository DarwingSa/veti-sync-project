'use client';

import { useEffect, useState } from 'react';
import { Calendar, Users, DollarSign, Syringe, Search, Bell, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import SummaryCard from '@/components/Dashboard/SummaryCard';
import MonthlyChart from '@/components/Dashboard/MonthlyChart';
import AppointmentList from '@/components/Dashboard/AppointmentList';
import PatientTable from '@/components/Dashboard/PatientTable';
import AddAppointmentModal from '@/components/AddAppointmentModal';
import NotificationList from '@/components/Dashboard/NotificationList';

export default function Dashboard() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 max-w-lg relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar pacientes, citas..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                    />
                </div>
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                                setShowMessages(false);
                            }}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors relative"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-slate-900 dark:text-white">Notificaciones</h3>
                                    <button className="text-xs text-emerald-500 hover:text-emerald-600 font-medium">Marcar leídas</button>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500 shrink-0">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">Nueva cita: Tobby</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Mañana, 9:00 AM</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 shrink-0">
                                            <Search className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">Resultados listos</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Luna (Gato Persa)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Messages */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowMessages(!showMessages);
                                setShowNotifications(false);
                            }}
                            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                        </button>

                        {showMessages && (
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-slate-900 dark:text-white">Mensajes</h3>
                                    <button className="text-xs text-emerald-500 hover:text-emerald-600 font-medium">Nuevo mensaje</button>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-500 shrink-0 font-bold text-xs">
                                            AG
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">Ana García</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate w-48">Hola, ¿tienen disponibilidad para el sábado?</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-500 shrink-0 font-bold text-xs">
                                            LT
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">Luis Torres</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate w-48">Gracias por la atención de hoy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400">Bienvenido de nuevo, <span className="font-semibold text-slate-700 dark:text-slate-200">{user.name}</span></p>
            </div>

            {/* Summary Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard
                    title="Citas hoy"
                    value="12"
                    trend="↑ 8%"
                    icon={Calendar}
                    iconColor="text-blue-600"
                    iconBg="bg-blue-50 dark:bg-blue-900/20"
                />
                <SummaryCard
                    title="Pacientes activos"
                    value="248"
                    trend="↑ 12%"
                    icon={Users}
                    iconColor="text-cyan-600"
                    iconBg="bg-cyan-50 dark:bg-cyan-900/20"
                />
                <SummaryCard
                    title="Vacunaciones"
                    value="86"
                    trend="↑ 24%"
                    icon={Syringe}
                    iconColor="text-indigo-600"
                    iconBg="bg-indigo-50 dark:bg-indigo-900/20"
                />
                <SummaryCard
                    title="Ingresos"
                    value="$8,942"
                    trend="↓ 3%"
                    trendUp={false}
                    icon={DollarSign}
                    iconColor="text-slate-600"
                    iconBg="bg-slate-100 dark:bg-slate-800"
                />
            </div>

            {/* Charts & Appointments Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <MonthlyChart />
                </div>
                <div>
                    <AppointmentList onAddAppointment={() => setIsAppointmentModalOpen(true)} />
                </div>
            </div>

            {/* Tables & Notifications Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <PatientTable />
                </div>
                <div>
                    <NotificationList />
                </div>
            </div>

            <AddAppointmentModal
                isOpen={isAppointmentModalOpen}
                onClose={() => setIsAppointmentModalOpen(false)}
                onAppointmentAdded={() => {
                    // Refresh data if needed
                    console.log('Cita agendada');
                }}
            />
        </div>
    );
}
