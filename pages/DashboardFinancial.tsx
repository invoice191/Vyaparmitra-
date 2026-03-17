
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, ComposedChart, Bar, Line
} from 'recharts';
import { Wallet, TrendingUp, TrendingDown, PieChart as PieIcon, Activity, Receipt, CreditCard, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { generateRevenueTrend, opexBreakdown, currentBusinessState } from '../data/mockData';

const DashboardFinancial: React.FC = () => {
  const financialData = generateRevenueTrend();
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">Financial Health</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Complete P&L statement and cash flow monitoring.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-300">
             GST Report
          </button>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-xl shadow-blue-200 dark:shadow-blue-900/20 hover:bg-blue-700 transition-all active:scale-95">
             File Returns
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Gross Margin" value="32.4%" trend={1.2} description="Target: 35%" />
        <MetricCard label="Monthly Opex" value="₹1.85 Lakhs" trend={4.2} description="Includes Salaries & Rent" />
        <MetricCard label="Tax Provision" value="₹64,200" trend={8.2} description="18% GST Estimated" />
        <MetricCard label="Break-even Point" value="₹4.2 Lakhs" trend={-2.4} description="Monthly Revenue required" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-blue-600" /> Revenue vs. Operating Expenses
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#64748b20" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Gross Revenue" barSize={40} />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={4} name="Total Opex" dot={{r: 5, fill: '#ef4444'}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col transition-colors">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-2 text-lg">
            <PieIcon className="h-5 w-5 text-purple-600" /> Opex Breakdown
          </h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={opexBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={10}
                  dataKey="value"
                >
                  {opexBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={6} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
             {opexBreakdown.slice(0, 4).map((item, i) => (
               <div key={item.name} className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                     {item.name}
                  </div>
                  <span className="text-slate-900 dark:text-white">₹{(item.value/1000).toFixed(1)}k</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center">
           <h3 className="font-bold text-slate-800 dark:text-slate-100">Cash Flow Statement (Daily)</h3>
           <button className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">Full Ledger</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead>
               <tr className="bg-slate-50/30 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4">Transaction</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Inflow</th>
                  <th className="px-6 py-4 text-right">Outflow</th>
                  <th className="px-6 py-4 text-right">Net Balance</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  { name: 'POS Sales Batch', cat: 'Sales', in: 14500, out: 0, balance: 421000 },
                  { name: 'Salary Disbursement', cat: 'Opex', in: 0, out: 85000, balance: 336000 },
                  { name: 'Supplier Payout (Apparel)', cat: 'Inventory', in: 0, out: 42000, balance: 294000 },
                  { name: 'E-commerce Transfer', cat: 'Sales', in: 6800, out: 0, balance: 300800 },
                  { name: 'Utility Payment', cat: 'Fixed', in: 0, out: 4500, balance: 296300 },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 text-xs font-bold text-slate-900 dark:text-slate-200">{row.name}</td>
                    <td className="px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{row.cat}</td>
                    <td className="px-6 py-4 text-right text-emerald-600 dark:text-emerald-400 font-bold text-xs">{row.in > 0 ? `+₹${row.in.toLocaleString('en-IN')}` : '-'}</td>
                    <td className="px-6 py-4 text-right text-rose-600 dark:text-rose-400 font-bold text-xs">{row.out > 0 ? `-₹${row.out.toLocaleString('en-IN')}` : '-'}</td>
                    <td className="px-6 py-4 text-right text-slate-900 dark:text-white font-black text-sm">₹{row.balance.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardFinancial;
