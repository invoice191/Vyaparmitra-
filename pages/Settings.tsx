
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Users, 
  Building2, 
  Bell, 
  Shield, 
  Database, 
  CreditCard, 
  ChevronRight, 
  Check, 
  ArrowLeft,
  Camera,
  Mail,
  Phone,
  MapPin,
  Trash2,
  Plus,
  UserPlus,
  FileText,
  Lock,
  Download,
  Globe
} from 'lucide-react';

type SettingsSection = 'main' | 'profile' | 'users' | 'invoices' | 'branches' | 'security' | 'billing';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('main');

  // --- SUB-PAGE: Business Profile ---
  const BusinessProfile = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3 space-y-4">
          <div className="relative group mx-auto md:mx-0 w-48 h-48 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] border-4 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-blue-500 transition-all">
            <Camera className="h-8 w-8 text-slate-400 group-hover:text-blue-500 mb-2" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update Logo</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center md:text-left leading-relaxed">
            Your logo will appear on all GST invoices and professional reports. Recommended size: 512x512px.
          </p>
        </div>
        
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Entity Name</label>
              <input type="text" defaultValue="Vyaparmitra Retail Pvt Ltd" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">GSTIN Number</label>
              <input type="text" defaultValue="29AAAAA0000A1Z5" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Headquarters Address</label>
            <textarea className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none focus:border-blue-500 h-24 resize-none" defaultValue="Suite 402, Innovate Plaza, Whitefield, Bengaluru, KA 560001" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Email</label>
              <input type="email" defaultValue="hello@vyaparmitra.in" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Helpline</label>
              <input type="tel" defaultValue="+91 80 4567 8901" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
        <button onClick={() => setActiveSection('main')} className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">Cancel</button>
        <button className="px-10 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">Save Profile</button>
      </div>
    </div>
  );

  // --- SUB-PAGE: User Management ---
  const UserManagement = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Access Directory</h4>
          <p className="text-xs text-slate-500 font-medium">Manage permissions for your store staff and accountants.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-500/10 active:scale-95 transition-all">
          <UserPlus className="h-3.5 w-3.5" /> Invite User
        </button>
      </div>
      
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
              <th className="px-8 py-4">User</th>
              <th className="px-8 py-4">Role</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {[
              { name: 'Alex Johnson', email: 'alex@vyaparmitra.in', role: 'Super Admin', status: 'Active' },
              { name: 'Priya Sharma', email: 'priya@vyaparmitra.in', role: 'Manager', status: 'Active' },
              { name: 'Rahul Gupta', email: 'rahul@vyaparmitra.in', role: 'Floor Staff', status: 'Away' },
              { name: 'Sanjay Kumar', email: 'sanjay.audit@gmail.com', role: 'External Auditor', status: 'Guest' },
            ].map((user, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-xl font-black text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold tracking-tight">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                    {user.role}
                   </span>
                </td>
                <td className="px-8 py-5">
                   <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : user.status === 'Away' ? 'bg-amber-500' : 'bg-slate-400'}`}></div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{user.status}</span>
                   </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- SUB-PAGE: Invoice Configuration ---
  const InvoiceSettings = () => (
    <div className="space-y-8 animate-fade-in">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
             <h4 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Billing Rules</h4>
             <div className="space-y-4">
                {[
                  { label: 'Auto-calculate CGST/SGST', desc: 'Required for domestic B2B sales' },
                  { label: 'Apply Rounded-Off Pricing', desc: 'Round total to nearest ₹1.00' },
                  { label: 'Digital Signature required', desc: 'Secure verification for e-invoices' },
                ].map((item, i) => (
                  <label key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl cursor-pointer group hover:border-blue-500 transition-all">
                    <div>
                      <p className="text-sm font-black text-slate-800 dark:text-slate-100">{item.label}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                    </div>
                    <div className="w-10 h-6 bg-slate-200 dark:bg-slate-800 rounded-full relative group-hover:bg-blue-100 transition-all">
                       <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </label>
                ))}
             </div>
          </div>
          <div className="space-y-6">
             <h4 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Footer Disclaimers</h4>
             <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Terms & Conditions</label>
                  <textarea className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 h-32 outline-none focus:border-blue-500" defaultValue="Goods once sold will not be taken back or exchanged. Interest at 18% p.a. will be charged if the bill is not paid on the due date." />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bank Account Details (for B2B)</label>
                  <textarea className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 h-24 outline-none focus:border-blue-500" defaultValue="HDFC Bank, Whitefield Branch | A/C: 50200012345678 | IFSC: HDFC0001234" />
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return <BusinessProfile />;
      case 'users': return <UserManagement />;
      case 'invoices': return <InvoiceSettings />;
      default: return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'profile', title: 'Business Profile', icon: Building2, desc: 'Update store info, logo, and taxes' },
            { id: 'users', title: 'User Management', icon: Users, desc: 'Assign Admin, Manager, and Staff roles' },
            { id: 'invoices', title: 'Invoice Settings', icon: FileText, desc: 'Customize GST bills and terms' },
            { id: 'branches', title: 'Multi-Branch', icon: Database, desc: 'Manage 3 active store locations' },
            { id: 'security', title: 'Security & Backup', icon: Shield, desc: 'End-to-end encryption & CSV backup' },
            { id: 'billing', title: 'Subscription', icon: CreditCard, desc: 'Manage PRO Plan and Billing' },
          ].map((sec, i) => (
            <button 
              key={sec.id} 
              onClick={() => setActiveSection(sec.id as SettingsSection)}
              className="w-full flex items-center justify-between p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
            >
              <div className="flex items-center gap-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors">
                  <sec.icon className="h-7 w-7 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{sec.title}</h4>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{sec.desc}</p>
                </div>
              </div>
              <ChevronRight className="h-6 w-6 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      );
    }
  };

  const getHeaderInfo = () => {
    switch (activeSection) {
      case 'profile': return { title: 'Business Profile', desc: 'Manage your retail identity and legal registration.' };
      case 'users': return { title: 'User Management', desc: 'Assign roles and control access across your organization.' };
      case 'invoices': return { title: 'Invoice Configuration', desc: 'Set your tax rules and professional billing templates.' };
      case 'branches': return { title: 'Branch Network', desc: 'Configure multi-location warehouses and storefronts.' };
      case 'security': return { title: 'Data Security', desc: 'Manage backups, encryption, and audit logs.' };
      case 'billing': return { title: 'Subscription & Billing', desc: 'Review your platform usage and payment methods.' };
      default: return { title: 'System Settings', desc: 'Control platform roles, security, and global defaults.' };
    }
  };

  const header = getHeaderInfo();

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex items-center gap-6">
          {activeSection !== 'main' && (
            <button 
              onClick={() => setActiveSection('main')}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{header.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">{header.desc}</p>
          </div>
        </div>
        {activeSection === 'main' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest">Enterprise Cloud Sync Active</span>
          </div>
        )}
      </div>

      {renderContent()}

      {activeSection === 'main' && (
        <div className="bg-slate-950 dark:bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-30"></div>
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-8">
                 <div className="bg-white/10 p-5 rounded-[2rem] border border-white/5 backdrop-blur-xl">
                    <Check className="h-8 w-8 text-blue-400" />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black tracking-tight">Vyaparmitra PRO Plan</h3>
                   <p className="text-slate-400 font-medium">Auto-renewing. Next cycle: <span className="text-white font-black uppercase">Jan 12, 2026</span></p>
                 </div>
              </div>
              <button onClick={() => setActiveSection('billing')} className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all active:scale-95 shadow-2xl">
                 Manage Plan
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
