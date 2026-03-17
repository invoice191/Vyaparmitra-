
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, UserPlus, TrendingDown, MapPin, Download } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import DateRangePicker from '../components/DateRangePicker';
import { customerSegments, geographicData, currentBusinessState } from '../data/mockData';

const DashboardCustomers: React.FC = () => {
  const [dateRange, setDateRange] = useState({ start: new Date(2025, 4, 1), end: new Date(2025, 4, 31) });
  const [isComparing, setIsComparing] = useState(false);

  const getLabel = () => {
    return `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`;
  };

  const filteredSegments = useMemo(() => {
    const days = (dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 3600 * 24);
    const multiplier = (days / 30) * (isComparing ? 1.15 : 1);
    
    return customerSegments.map(s => ({
      ...s,
      value: Math.floor(s.value * multiplier)
    }));
  }, [dateRange, isComparing]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* --- Unified Header & Time Controller --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Customer Analytics</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Consumer behavior for <span className="text-indigo-600 font-bold">{getLabel()}</span></p>
        </div>
        
        <div className="flex items-center gap-3">
          <DateRangePicker 
            onApply={(start, end, compare) => {
              setDateRange({ start, end });
              setIsComparing(compare);
            }} 
          />
          <button className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-all active:scale-95">
             <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Active Base" value={Math.floor(currentBusinessState.customers).toLocaleString('en-IN')} trend={5.2} description="Loyal segment growth" />
        <MetricCard label="Avg Order Value" value={`₹${Math.floor(2450).toLocaleString('en-IN')}`} trend={12.4} description="Period AOV" />
        <MetricCard label="New Acquisitions" value={Math.floor(currentBusinessState.newCustomers)} trend={15.8} description="New cohort size" />
        <div className="bg-rose-50 dark:bg-rose-500/10 p-5 rounded-2xl border border-rose-100 dark:border-rose-500/20 flex flex-col justify-between transition-colors">
           <div className="flex justify-between items-center mb-2">
             <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Churn Risk</span>
             <TrendingDown className="h-4 w-4 text-rose-600 dark:text-rose-400" />
           </div>
           <h3 className="text-3xl font-black text-rose-900 dark:text-white">4.2%</h3>
           <p className="text-[10px] font-bold text-rose-500 uppercase mt-2">Predicted Period Churn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-3 text-lg">
            <Users className="h-5 w-5 text-blue-600" /> Segment Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filteredSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={10}
                  dataKey="value"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={6} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff' }} />
                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ color: '#64748b', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-3 text-lg">
            <MapPin className="h-5 w-5 text-indigo-600" /> Geographic Heatmap
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geographicData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#64748b20" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis dataKey="state" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} />
                <Tooltip 
                   contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff' }}
                   formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomers;
