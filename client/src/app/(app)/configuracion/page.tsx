'use client';

import { Settings } from 'lucide-react';

export default function ConfigurationPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Configuración</h1>
                    <p className="text-slate-500 dark:text-slate-400">Gestiona las preferencias de la aplicación</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Próximamente</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    El módulo de configuración estará disponible en la próxima actualización.
                </p>
            </div>
        </div>
    );
}
