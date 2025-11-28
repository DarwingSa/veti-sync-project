import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  color?: string;
  delay?: number;
}

const AnimatedNumber = ({ value }: { value: number }) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

const StatCard = ({ title, value, icon: Icon, trend, color, delay = 0 }: StatCardProps) => {
  const isNumber = typeof value === 'number';
  const numericValue = isNumber ? value : parseInt(value.toString().replace(/[^0-9]/g, '')) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color ? color.replace('text-', 'from-').replace('bg-', '') : 'from-cyan-50 dark:from-cyan-900/20'} to-transparent opacity-20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`p-3 rounded-xl ${color ? color.replace('text-', 'bg-').replace('50', '100/50') : 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'}`}>
          <Icon className={`w-6 h-6 ${color ? color : 'text-cyan-600 dark:text-cyan-400'}`} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
            {trend}
          </span>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
          {isNumber ? (
            <AnimatedNumber value={numericValue} />
          ) : (
            value
          )}
        </h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;