'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { Stethoscope, Activity, Heart, PawPrint, Calendar, ShieldCheck } from 'lucide-react';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
    role: 'veterinario' | 'paciente';
}

const roleConfig = {
    veterinario: {
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80',
        gradient: 'from-cyan-600/30 to-blue-900/50',
        icon: Stethoscope,
        iconColor: 'text-cyan-400',
        iconBg: 'bg-cyan-500/20 border-cyan-500/30',
        headline: 'Gestión veterinaria profesional',
        subheadline: 'Optimiza tu clínica, gestiona pacientes y mejora la atención médica con herramientas avanzadas.',
        features: [
            { icon: Activity, text: 'Monitoreo clínico' },
            { icon: Calendar, text: 'Gestión de citas' }
        ]
    },
    paciente: {
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80',
        gradient: 'from-emerald-600/30 to-teal-900/50',
        icon: PawPrint,
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/20 border-emerald-500/30',
        headline: 'El mejor cuidado para tu mascota',
        subheadline: 'Accede a tu historial médico, agenda citas y mantén a tu mejor amigo saludable y feliz.',
        features: [
            { icon: Heart, text: 'Historial de salud' },
            { icon: ShieldCheck, text: 'Vacunas y control' }
        ]
    }
};

export default function AuthLayout({ children, title, subtitle, role }: AuthLayoutProps) {
    const config = roleConfig[role];
    const Icon = config.icon;

    return (
        <div className="min-h-screen w-full flex bg-white">
            {/* Left Side - Dynamic & Decorative (Desktop Only) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={role}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} z-10`} />
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-50 grayscale-[20%]"
                            style={{ backgroundImage: `url('${config.image}')` }}
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="relative z-20 text-white p-12 max-w-xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={role}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-3 rounded-xl backdrop-blur-sm border ${config.iconBg}`}>
                                    <Icon className={`w-8 h-8 ${config.iconColor}`} />
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight">VetiSync</h1>
                            </div>

                            <h2 className="text-3xl font-light leading-tight mb-6 text-slate-100">
                                {config.headline}
                            </h2>
                            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                                {config.subheadline}
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                {config.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 text-slate-200">
                                        <feature.icon className={`w-5 h-5 ${config.iconColor}`} />
                                        <span>{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Side - Form (Mobile & Desktop) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50/50">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center lg:text-left">
                        <div className="lg:hidden flex justify-center mb-6">
                            <div className={`p-3 rounded-xl ${role === 'veterinario' ? 'bg-cyan-100' : 'bg-emerald-100'}`}>
                                <Icon className={`w-8 h-8 ${role === 'veterinario' ? 'text-cyan-600' : 'text-emerald-600'}`} />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
                        <p className="mt-2 text-gray-500">{subtitle}</p>
                    </div>

                    {children}
                </motion.div>
            </div>
        </div>
    );
}
