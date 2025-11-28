import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
    title: string;
    value: string | number;
    trend: string;
    trendUp?: boolean;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
}

export default function SummaryCard({
    title,
    value,
    trend,
    trendUp = true,
    icon: Icon,
    iconColor,
    iconBg,
}: SummaryCardProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between h-full transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${iconBg}`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <span className={trendUp ? 'text-emerald-500 font-medium' : 'text-red-500 font-medium'}>
                    {trend}
                </span>
                <span className="text-slate-400 dark:text-slate-500">vs mes pasado</span>
            </div>
        </div>
    );
}
