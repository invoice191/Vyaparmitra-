
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ComposedChart, Line
} from 'recharts';
import { Package, TrendingUp, DollarSign, Activity, Calendar, Clock, ChevronDown, Download } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import DateRangePicker from '../components/DateRangePicker';
import { topProducts } from '../data/mockData';

const DashboardProducts: React.FC = () => {
  const [dateRange, setDateRange] = useState({ start: new Date(2025, 4, 1), end: new Date(2025, 4, 31) });
  const [isComparing, setIsComparing] = useState(false);

  const getLabel = () => {
    return `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`;
  };

  const filteredProducts = useMemo(() => {
    const days = (dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 3600 * 24);
    const multiplier = Math.max(0.2, (days / 30) * (isComparing ? 1.2 : 1));

    return topProducts.map(p => ({
      ...p,
      revenue: Math.floor(p.revenue * multiplier),
      units: Math.floor(p.units * multiplier)
    }));
  }, [dateRange, isComparing]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Product Performance</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">SKU efficiency for <span className="text-blue-600 font-bold">{getLabel()}</span></p>
        </div>
        
        <div className="flex items-center gap-3">
          <DateRangePicker 
            onApply={(start, end, compare) => {
              setDateRange({ start, end });
              setIsComparing(compare);
            }} 
          />
          <button className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-95">
             <Download className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Analyzed SKUs" value="452" trend={1.2} description="Catalog size" />
        <MetricCard label="Gross Margin" value="32.4%" trend={0.8} description="Profit efficiency" />
        <MetricCard label="Satisfaction" value="98.2%" trend={-5.2} description="Returns trend" />
        <MetricCard label="Velocity" value="12.5" suffix=" days" trend={-2.4} description="Avg shelf life" />
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <h3 className="font-black text-slate-800 dark:text-slate-100 mb-10 flex items-center gap-3 text-lg">
          <Activity className="h-6 w-6 text-emerald-600" /> Revenue vs Margin Distribution
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={filteredProducts}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#64748b20" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#10b981'}} unit="%" />
              <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', backgroundColor: 'rgba(15, 23, 42, 0.95)', color: '#fff', padding: '20px' }} />
              <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Revenue (₹)" />
              <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#10b981" strokeWidth={5} dot={{ r: 6, fill: '#10b981', strokeWidth: 3, stroke: '#fff' }} name="Profit Margin (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardProducts;
