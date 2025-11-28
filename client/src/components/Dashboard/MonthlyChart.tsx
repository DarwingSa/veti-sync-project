'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MonthlyChart() {
    const [activeTab, setActiveTab] = useState<'citas' | 'vacunas' | 'ingresos'>('citas');

    const datasets = {
        citas: [
            { month: 'Ene', value: 45 },
            { month: 'Feb', value: 70 },
            { month: 'Mar', value: 55 },
            { month: 'Abr', value: 85 },
            { month: 'May', value: 60 },
            { month: 'Jun', value: 75 },
        ],
        vacunas: [
            { month: 'Ene', value: 20 },
            { month: 'Feb', value: 35 },
            { month: 'Mar', value: 25 },
            { month: 'Abr', value: 45 },
            { month: 'May', value: 30 },
            { month: 'Jun', value: 40 },
        ],
        ingresos: [
            { month: 'Ene', value: 1200 },
            { month: 'Feb', value: 1900 },
            { month: 'Mar', value: 1500 },
            { month: 'Abr', value: 2200 },
            { month: 'May', value: 1800 },
            { month: 'Jun', value: 2100 },
        ]
    };

    const currentData = datasets[activeTab];
    const maxVal = Math.max(...currentData.map(d => d.value));

    const tabs = [
        { id: 'citas', label: 'Citas', color: 'bg-blue-600' },
        { id: 'vacunas', label: 'Vacunas', color: 'bg-cyan-600' },
        { id: 'ingresos', label: 'Ingresos', color: 'bg-slate-600' }
    ] as const;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Estadísticas mensuales</h3>
                <div className="flex gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${activeTab === tab.id
                                    ? `${tab.color} text-white shadow-md shadow-blue-500/20`
                                    : 'bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between gap-4 flex-1 min-h-[200px]">
                {currentData.map((item, index) => (
                    <div key={item.month} className="flex flex-col items-center justify-end gap-3 w-full h-full group">
                        <div className="flex flex-col justify-end w-full h-full relative">
                            {/* Value Label (Always visible for demo impact) */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center mb-2"
                            >
                                {activeTab === 'ingresos' ? `$${item.value}` : item.value}
                            </motion.div>

                            <motion.div
                                key={activeTab}
                                initial={{ height: 0 }}
                                animate={{ height: `${(item.value / maxVal) * 80}%` }} // Max 80% to leave room for label
                                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                                className={`w-full rounded-t-xl relative overflow-hidden ${activeTab === 'citas' ? 'bg-blue-500' :
                                        activeTab === 'vacunas' ? 'bg-cyan-500' :
                                            'bg-slate-600'
                                    }`}
                            >
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                            </motion.div>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{item.month}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
