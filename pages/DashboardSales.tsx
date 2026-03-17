
import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { ShoppingCart, DollarSign, Calendar, Clock, ChevronDown, Download, TrendingUp } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import DateRangePicker from '../components/DateRangePicker';
import { generateRevenueTrend, salesByDayAndTime } from '../data/mockData';

const DashboardSales: React.FC = () => {
  const [dateRange, setDateRange] = useState({ start: new Date(2025, 4, 1), end: new Date(2025, 4, 31) });
  const [isComparing, setIsComparing] = useState(false);

  const getLabel = () => {
    return `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`;
  };

  const trendData = useMemo(() => {
    const baseData = generateRevenueTrend();
    const days = (dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 3600 * 24);
    const multiplier = Math.max(0.1, (days / 30) * (isComparing ? 1.25 : 1));

    return baseData.map(d => ({
      ...d,
      value: Math.floor(d.value * multiplier)
    }));
  }, [dateRange, isComparing]);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Sales & Revenue</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Precision tracking for <span className="text-emerald-600 font-bold">{getLabel()}</span></p>
        </div>
        
        <div className="flex items-center gap-3">
          <DateRangePicker 
            onApply={(start, end, compare) => {
              setDateRange({ start, end });
              setIsComparing(compare);
            }} 
          />
          <button className="bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-700 transition-all active:scale-95 shadow-xl shadow-emerald-500/20">
             <Download className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Est. Gross Revenue" value={`₹${trendData[0].value.toLocaleString('en-IN')}`} prefix="" trend={15.4} description={`Period analysis active`} />
        <MetricCard label="Peak Velocity" value={`₹${(trendData[0].value / 30).toLocaleString('en-IN', { maximumFractionDigits: 0 })}/day`} trend={5.2} description="Revenue speed" />
        <MetricCard label="Conversion Rate" value="12.4%" trend={-2.1} description="Store footfall to sale" />
        <MetricCard label="UPI Success Rate" value="99.2%" trend={0.5} description="Payment gateway health" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-black text-slate-800 dark:text-slate-100 mb-10 flex items-center gap-3 text-lg">
            <TrendingUp className="h-6 w-6 text-blue-600" /> Revenue Growth Projection
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#64748b20" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', backgroundColor: 'rgba(15, 23, 42, 0.95)', color: '#fff', padding: '20px' }} />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorSales)" name="Gross Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
           <h3 className="font-black text-slate-800 dark:text-slate-100 mb-10 flex items-center gap-3 text-lg">
            <Clock className="h-6 w-6 text-amber-500" /> Hourly Trends
          </h3>
          <div className="flex-1 space-y-6">
            {salesByDayAndTime.slice(0, 5).map(item => (
              <div key={item.day} className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                  <span>{item.day}</span>
                  <span className="text-slate-900 dark:text-white">Peak: 18:00 - 00:00</span>
                </div>
                <div className="flex h-3 gap-1">
                   <div className="bg-blue-200 dark:bg-blue-900/30 rounded-full transition-all" style={{ width: `${(item['12-18'] / 13500) * 100}%` }}></div>
                   <div className="bg-blue-600 rounded-full transition-all" style={{ width: `${(item['18-00'] / 13500) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Insight</p>
             <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Sunday evenings show 12% higher checkout volume. Recommend adding staff.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSales;
