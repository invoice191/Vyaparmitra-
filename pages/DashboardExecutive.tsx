
import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie
} from 'recharts';
import { Sparkles, Download, Activity, CreditCard, Package, AlertCircle } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import DateRangePicker from '../components/DateRangePicker';
import { generateRevenueTrend, topProducts, currentBusinessState, recentTransactions } from '../data/mockData';
import { getBusinessInsights } from '../services/geminiService';
import { BusinessInsightResponse } from '../types';

const DashboardExecutive: React.FC = () => {
  const [insightData, setInsightData] = useState<BusinessInsightResponse | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  
  // New Unified Filter State
  const [dateRange, setDateRange] = useState({ start: new Date(2025, 4, 1), end: new Date(2025, 4, 31) });
  const [isComparing, setIsComparing] = useState(false);

  const getLabel = () => {
    return `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`;
  };

  // Simulated dynamic data
  const revenueData = useMemo(() => {
    const baseData = generateRevenueTrend();
    // Simulate some variance based on range length
    const days = (dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 3600 * 24);
    const multiplier = (days / 30) * (isComparing ? 1.2 : 1);

    return baseData.map(d => ({
      ...d,
      value: Math.floor(d.value * multiplier),
      profit: Math.floor(d.profit * multiplier)
    }));
  }, [dateRange, isComparing]);

  const handleGenerateInsights = async () => {
    setLoadingInsights(true);
    const result = await getBusinessInsights('Executive Summary', {
      metrics: currentBusinessState,
      topProducts,
      recentPerformance: revenueData.slice(-3),
      selectedPeriod: getLabel(),
    });
    setInsightData(result);
    setLoadingInsights(false);
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* --- Dashboard Header --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Executive Summary</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Business health for <span className="text-blue-600 font-bold">{getLabel()}</span></p>
        </div>
        
        <div className="flex items-center gap-3">
          <DateRangePicker 
            onApply={(start, end, compare) => {
              setDateRange({ start, end });
              setIsComparing(compare);
            }} 
          />
          <button className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95">
             <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          label="Estimated Revenue" 
          value={`₹${(currentBusinessState.revenue * (revenueData[0].value / 45000)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} 
          trend={14.2} 
          description={`Volume for selected period`} 
        />
        <MetricCard 
          label="Net Operating Profit" 
          value={`₹${(currentBusinessState.profit * (revenueData[0].profit / 12000)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} 
          trend={-5.4} 
          description="EBITDA Margin" 
        />
        <MetricCard 
          label="Orders Count" 
          value={Math.floor(currentBusinessState.transactions * (revenueData[0].value / 45000)).toLocaleString('en-IN')} 
          trend={8.2} 
          description="Transaction velocity" 
        />
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full transition-colors">
           <div className="flex justify-between items-center mb-2">
             <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Health Index</span>
             <Activity className="h-4 w-4 text-blue-500" />
           </div>
           <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{currentBusinessState.healthScore}</h3>
              <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg uppercase">
                Optimized
              </div>
           </div>
           <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 mt-4 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full transition-all duration-700" style={{ width: `${currentBusinessState.healthScore}%` }}></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-blue-600" /> Granular Trend Mapping
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Revenue
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20"></div> Profit
              </div>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#64748b20" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 600, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff', padding: '15px' }} />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-950 to-indigo-950 p-8 rounded-[3rem] border border-white/5 shadow-2xl text-white flex flex-col transition-all">
          <div className="flex justify-between items-start mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-500/20"><Sparkles className="h-6 w-6 text-white" /></div>
              <div>
                <h3 className="font-black text-xl tracking-tight leading-none">AI Insight</h3>
                <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1.5">Market Intelligence</p>
              </div>
            </div>
            <button 
              onClick={handleGenerateInsights}
              disabled={loadingInsights}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 active:scale-95 disabled:opacity-50"
            >
              {loadingInsights ? 'Analyzing...' : `Update`}
            </button>
          </div>
          
          {insightData ? (
            <div className="flex-1 flex flex-col">
              <div className="prose prose-sm prose-invert max-w-none mb-8 overflow-y-auto max-h-[350px] custom-scrollbar">
                <div className="text-slate-200 leading-relaxed text-sm font-medium" dangerouslySetInnerHTML={{ 
                  __html: insightData.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') 
                }} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
              <div className="p-5 bg-blue-500/10 rounded-3xl border border-blue-500/20 animate-pulse">
                <AlertCircle className="h-10 w-10 text-blue-400" />
              </div>
              <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">AI analysis for <span className="font-bold text-white">{getLabel()}</span> is ready to discover growth points.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardExecutive;
