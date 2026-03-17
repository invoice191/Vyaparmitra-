
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  FileText, 
  Settings, 
  PieChart,
  Wallet,
  LogOut,
  ChevronRight,
  Database,
  ArrowLeftRight,
  Receipt,
  X
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'executive', label: 'Executive Summary', icon: LayoutDashboard },
    { id: 'customers', label: 'Customer Analytics', icon: Users },
    { id: 'products', label: 'Product Performance', icon: Package },
    { id: 'inventory', label: 'Inventory Management', icon: BarChart3 },
    { id: 'sales', label: 'Sales & Revenue', icon: ShoppingCart },
    { id: 'financial', label: 'Financial Overview', icon: Wallet },
    { id: 'invoices', label: 'Invoices', icon: Receipt },
    { id: 'reports', label: 'Reports Library', icon: FileText },
    { id: 'data-mgmt', label: 'Data Management', icon: ArrowLeftRight },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-950 h-screen text-slate-300 flex flex-col border-r border-white/5 shadow-2xl relative">
      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-2xl shadow-blue-900/40 shrink-0">
            <PieChart className="text-white h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter leading-none">Vyaparmitra</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Analytics</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 mt-2 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${
              activePage === item.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' 
                : 'hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-4">
              <item.icon className={`h-5 w-5 ${activePage === item.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`} />
              <span className="font-bold text-[13px] tracking-wide">{item.label}</span>
            </div>
            {activePage === item.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
          </button>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-white/5 p-5 rounded-3xl border border-white/5 mb-6 hidden sm:block">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Cloud Status</p>
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-bold text-slate-200">Synced (1.2GB)</span>
           </div>
        </div>
        
        <button 
          onClick={() => setActivePage('landing')}
          className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-white/5 text-slate-400 hover:bg-rose-500 hover:text-white transition-all duration-500 font-bold text-xs uppercase tracking-widest group shadow-sm active:scale-95"
        >
          <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Logout System
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
