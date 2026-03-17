
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, Cell, ComposedChart, Line
} from 'recharts';
import { 
  AlertTriangle, 
  Package, 
  Search, 
  Truck, 
  ShieldAlert,
  Clock,
  History,
  Activity,
  Settings,
  X,
  Mail,
  Phone,
  User,
  CreditCard,
  ExternalLink,
  ChevronRight,
  Filter,
  FileDown,
  Warehouse,
  ArrowRight,
  RefreshCw,
  MoreHorizontal
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { supplierPerformance, inventoryAgingData, deadStockItems, warehouseStock } from '../data/mockData';

const DashboardInventory: React.FC = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<typeof supplierPerformance[0] | null>(null);

  const stockData = [
    { name: 'Electronics', stock: 120, lowStock: 15, outOfStock: 2 },
    { name: 'Apparel', stock: 450, lowStock: 45, outOfStock: 12 },
    { name: 'Home', stock: 210, lowStock: 30, outOfStock: 5 },
    { name: 'Beauty', stock: 180, lowStock: 10, outOfStock: 1 },
  ];

  return (
    <div className="space-y-6 relative min-h-screen pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">Inventory & Logistics</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Real-time stock tracking across Indian hubs.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all active:scale-95 text-slate-700 dark:text-slate-300">
            <RefreshCw className="h-4 w-4" /> Sync ERP
          </button>
          <button className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-xl active:scale-95">
            <Package className="h-4 w-4" /> Stock Adjustment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Live Stock Valuation" value="12.5" suffix=" Lakhs" prefix="₹" trend={2.4} description="Total 4,210 items" />
        <MetricCard label="Stockout Risk Items" value="42" trend={-12} description="Requires immediate reorder" />
        <MetricCard label="Avg. Shelf Life" value="58" suffix=" Days" trend={0.5} description="Healthy velocity" />
        <MetricCard label="Damaged/Returns" value="₹12.4k" trend={-2.1} description="Defect rate: 0.9%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Warehouse className="h-5 w-5 text-blue-600" /> Warehouse-wise Stock
            </h3>
            <button className="text-xs font-bold text-blue-600 hover:underline transition-all">View Map</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/30 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4">Warehouse</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Valuation</th>
                  <th className="px-6 py-4">Capacity</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {warehouseStock.map(wh => (
                  <tr key={wh.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{wh.name}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">{wh.id}</p>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-400">{wh.location}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white transition-colors">₹{wh.stockValue.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden min-w-[60px]">
                            <div className={`h-full ${wh.capacity > 90 ? 'bg-rose-500' : 'bg-blue-500'}`} style={{ width: `${wh.capacity}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{wh.capacity}%</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                        wh.capacity > 90 ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {wh.capacity > 90 ? 'CRITICAL' : 'STABLE'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Low Stock Alerts
          </h3>
          <div className="space-y-4">
            {deadStockItems.slice(0, 3).map((item) => (
              <div key={item.sku} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex justify-between items-center transition-colors">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{item.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Qty: <span className="text-rose-600 dark:text-rose-400">{item.stock}</span> / Min: 50</p>
                </div>
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-100 dark:shadow-none transition-all">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            Reorder Plan (AI)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-2">
             <History className="h-5 w-5 text-indigo-600" /> Stock Movement History
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#64748b20" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff' }}
                />
                <Bar dataKey="stock" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Inflow" />
                <Bar dataKey="lowStock" fill="#94a3b8" radius={[6, 6, 0, 0]} name="Outflow" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Dead Stock Identification</h3>
            <span className="text-[10px] font-black text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-lg uppercase tracking-widest">Action Required</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
             {deadStockItems.map(item => (
               <div key={item.sku} className="p-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center font-bold text-slate-400 dark:text-slate-600">?</div>
                     <div>
                       <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{item.name}</p>
                       <p className="text-[10px] text-slate-400 dark:text-slate-500">Last Sale: {item.lastSold}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-black text-slate-900 dark:text-white">₹{item.value.toLocaleString('en-IN')}</p>
                     <button className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase hover:underline">Liquidate</button>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInventory;
