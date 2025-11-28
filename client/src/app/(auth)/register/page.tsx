'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { registerUser } from '@/services/authService';
import { motion } from 'framer-motion';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState<'veterinario' | 'paciente'>('veterinario');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await registerUser(name, email, password, role);
            login(response.token);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
            setError(errorMessage);
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Crear Cuenta</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Únete a VetiSync y gestiona tu clínica</p>
            </div>

            <div className="space-y-6">
                {/* Role Selector */}
                <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl flex relative">
                    <motion.div
                        className={`absolute inset-y-1.5 w-[calc(50%-6px)] bg-white dark:bg-slate-700 rounded-lg shadow-sm ${role === 'veterinario' ? 'left-1.5' : 'left-[calc(50%+3px)]'
                            }`}
                        layoutId="activeRoleRegister"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    <button
                        onClick={() => setRole('veterinario')}
                        className={`relative z-10 flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${role === 'veterinario' ? 'text-cyan-700 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                    >
                        Veterinario
                    </button>
                    <button
                        onClick={() => setRole('paciente')}
                        className={`relative z-10 flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${role === 'paciente' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                    >
                        Paciente
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Nombre Completo</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isLoading}
                            className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                            placeholder="Juan Pérez"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                            className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                            placeholder="nombre@ejemplo.com"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                            placeholder="Min. 6 caracteres"
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-sm text-red-600 dark:text-red-400 flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 font-bold text-white rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 ${role === 'veterinario'
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-500/25'
                            : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-500/25'
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creando cuenta...
                            </span>
                        ) : 'Registrarse'}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className={`font-semibold hover:underline transition-colors ${role === 'veterinario' ? 'text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300' : 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300'
                        }`}>
                        Inicia Sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
