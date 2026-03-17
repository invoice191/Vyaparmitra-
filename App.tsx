
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardExecutive from './pages/DashboardExecutive';
import DashboardInventory from './pages/DashboardInventory';
import DashboardCustomers from './pages/DashboardCustomers';
import DashboardProducts from './pages/DashboardProducts';
import DashboardSales from './pages/DashboardSales';
import DashboardFinancial from './pages/DashboardFinancial';
import Invoices from './pages/Invoices';
import ReportsLibrary from './pages/ReportsLibrary';
import DataManagement from './pages/DataManagement';
import Settings from './pages/Settings';
import LandingPage from './pages/LandingPage';
import { 
  Search, 
  Bell, 
  LayoutGrid, 
  Zap, 
  Scan, 
  Upload, 
  X, 
  CheckCircle2, 
  Menu, 
  Moon, 
  Sun,
  User,
  Settings as SettingsIcon,
  Shield,
  CreditCard,
  LogOut,
  ChevronDown,
  Building2
} from 'lucide-react';
import { initialInvoices } from './data/mockData';
import { Invoice } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('landing');
  const [isFlexMode, setIsFlexMode] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsScanning(true);
      setTimeout(() => {
        const newInvoice: Invoice = {
          id: `INV-SCAN-${Math.floor(1000 + Math.random() * 9000)}`,
          customerName: 'Scanned Customer',
          date: new Date().toISOString().split('T')[0],
          amount: Math.floor(500 + Math.random() * 5000),
          status: 'Unpaid',
          items: 1,
          taxAmount: 90
        };
        setInvoices([newInvoice, ...invoices]);
        setIsScanning(false);
        setIsScanModalOpen(false);
        setActivePage('invoices');
      }, 2000);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case 'landing': return <LandingPage onStart={() => setActivePage('executive')} />;
      case 'executive': return <DashboardExecutive />;
      case 'customers': return <DashboardCustomers />;
      case 'products': return <DashboardProducts />;
      case 'inventory': return <DashboardInventory />;
      case 'sales': return <DashboardSales />;
      case 'financial': return <DashboardFinancial />;
      case 'invoices': return <Invoices invoices={invoices} />;
      case 'reports': return <ReportsLibrary />;
      case 'settings': return <Settings />;
      case 'data-mgmt': return <DataManagement />;
      default: return <DashboardExecutive />;
    }
  };

  if (activePage === 'landing') return renderContent();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
        <Sidebar activePage={activePage} setActivePage={(page) => {
          setActivePage(page);
          setIsSidebarOpen(false);
        }} />
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 lg:ml-64 min-w-0 flex flex-col">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-4 md:px-10 flex items-center justify-between shadow-sm transition-colors">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            >
              <Menu className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </button>
            <div className="relative w-48 md:w-96 max-w-full hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Query any business metric..." 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-12 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 dark:text-slate-200 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button 
              onClick={() => setIsScanModalOpen(true)}
              className="flex items-center gap-2 px-3 md:px-5 py-2.5 bg-blue-600 text-white rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-200 dark:shadow-blue-900/20 hover:bg-blue-700 transition-all active:scale-95"
            >
              <Scan className="h-4 w-4" />
              <span className="hidden xs:inline">Scan / Upload</span>
            </button>

            <button 
              onClick={() => setIsFlexMode(!isFlexMode)}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                isFlexMode ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Zap className={`h-3.5 w-3.5 ${isFlexMode ? 'animate-pulse' : ''}`} />
              {isFlexMode ? 'Flex Mode: On' : 'Flex Mode'}
            </button>
            
            <div className="flex items-center gap-1 md:gap-3">
              <button className="p-2 md:p-2.5 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
            </div>
            
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden xs:block"></div>
            
            {/* User Profile Area */}
            <div className="relative" ref={profileMenuRef}>
              <div 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 p-1 md:px-4 md:py-2 rounded-2xl border border-blue-100 dark:border-blue-900/30 group cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all active:scale-95"
              >
                <div className="text-right hidden xl:block">
                  <p className="text-[10px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest leading-none">Alex Johnson</p>
                  <p className="text-[10px] font-bold text-blue-500 dark:text-blue-500 uppercase tracking-widest leading-none mt-1">Super Admin</p>
                </div>
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-500/20">AJ</div>
                <ChevronDown className={`h-3 w-3 text-blue-400 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 z-[100] overflow-hidden animate-slide-up origin-top-right backdrop-blur-xl">
                  {/* Dropdown Header */}
                  <div className="p-6 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg">AJ</div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white leading-tight">Alex Johnson</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">alex.j@vyaparmitra.in</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest">
                       <span>Enterprise Pro</span>
                       <CheckCircle2 className="h-3 w-3" />
                    </div>
                  </div>

                  {/* Dropdown Links */}
                  <div className="p-4 space-y-1">
                    {[
                      { id: 'profile', icon: Building2, label: 'Business Profile', desc: 'Legal info & GST' },
                      { id: 'security', icon: Shield, label: 'Security & Access', desc: 'Passkeys & Roles' },
                      { id: 'billing', icon: CreditCard, label: 'Subscription', desc: 'View invoices' },
                    ].map(item => (
                      <button 
                        key={item.id}
                        onClick={() => {
                          setActivePage('settings');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group"
                      >
                        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl group-hover:bg-blue-600 transition-colors">
                          <item.icon className="h-4 w-4 text-slate-400 group-hover:text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-800 dark:text-slate-100">{item.label}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Dropdown Footer */}
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                    <button 
                      onClick={() => setActivePage('settings')}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
                    >
                      <SettingsIcon className="h-3.5 w-3.5" /> Full Settings
                    </button>
                    <button 
                      onClick={() => setActivePage('landing')}
                      className="w-full mt-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-10 max-w-[1600px] mx-auto w-full animate-fade-in transition-colors">
          {renderContent()}
        </main>
      </div>

      {/* --- Scanner Modal --- */}
      {isScanModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isScanning && setIsScanModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden animate-slide-up border border-slate-100 dark:border-slate-800">
            <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Invoice Intelligence</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium">Scan or upload to auto-populate records.</p>
              </div>
              <button onClick={() => !isScanning && setIsScanModalOpen(false)} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all">
                <X className="h-6 w-6 text-slate-400" />
              </button>
            </div>

            <div className="p-6 md:p-10 space-y-6 md:space-y-8">
              {isScanning ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-6">
                  <div className="relative">
                    <div className="w-16 md:w-24 h-16 md:h-24 border-4 border-blue-100 dark:border-blue-900 border-t-blue-600 rounded-full animate-spin"></div>
                    <Scan className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 md:h-8 w-6 md:h-8 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-base md:text-lg font-black text-slate-900 dark:text-slate-100">Analyzing Invoice...</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium">AI is extracting line items and tax data.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="group border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem] p-8 md:p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-200 dark:hover:border-blue-900 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all"
                  >
                    <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-full shadow-xl group-hover:scale-110 transition-transform mb-4 md:mb-6 border border-slate-50 dark:border-slate-700">
                      <Upload className="h-8 md:h-10 w-8 md:h-10 text-blue-600" />
                    </div>
                    <h4 className="text-lg md:text-xl font-black text-slate-900 dark:text-slate-100 mb-2">Upload Invoice File</h4>
                    <p className="text-slate-400 dark:text-slate-500 font-medium text-xs md:text-sm max-w-[200px]">PDF, JPG, or PNG</p>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,application/pdf" />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
                    <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-600"><span className="bg-white dark:bg-slate-900 px-4">or use camera</span></div>
                  </div>

                  <button className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-4 md:py-5 rounded-[1.5rem] font-black text-base md:text-lg flex items-center justify-center gap-3 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-xl active:scale-[0.98]">
                    <Scan className="h-5 md:h-6 w-5 md:h-6" /> Open Smart Scanner
                  </button>
                </>
              )}
            </div>
            
            <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-800/50 text-center">
              <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-500">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">99.2% AI Accuracy Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
