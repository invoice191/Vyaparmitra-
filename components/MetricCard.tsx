
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: number;
  suffix?: string;
  prefix?: string;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, suffix, prefix, description }) => {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
            isPositive ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 
            isNegative ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : 
             isNegative ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-slate-500 dark:text-slate-400 font-semibold">{prefix}</span>}
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">{value}</h3>
        {suffix && <span className="text-slate-500 dark:text-slate-400 text-sm">{suffix}</span>}
      </div>
      {description && <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 truncate">{description}</p>}
    </div>
  );
};

export default MetricCard;
