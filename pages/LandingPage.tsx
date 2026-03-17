
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  BarChart3, 
  Zap, 
  PieChart, 
  Users, 
  Layers,
  Database,
  Smartphone,
  Cpu,
  Lock,
  Play,
  MessageCircle,
  X,
  Send,
  Sparkles,
  Edit3,
  Check,
  Palette,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Globe,
  Calendar,
  Star,
  ShieldCheck,
  TrendingUp,
  Award,
  Menu
} from 'lucide-react';
import { getSupportResponse } from '../services/geminiService';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  // --- Flex Mode State ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState(() => {
    const saved = localStorage.getItem('vip_site_config');
    return saved ? JSON.parse(saved) : {
      heroTitle: "Intelligence for Every Indian Vyapari",
      heroDesc: "The smartest BI platform designed specifically for retail. Automate your inventory, predict customer churn, and scale your revenue with AI-powered insights.",
      primaryColor: "#2563eb", // blue-600
      contactAddress: "Suite 402, Innovate Plaza, Bengaluru, KA 560001",
      contactEmail: "hello@vyaparmitra.in",
      contactPhone: "+91 80 4567 8901",
      footerTagline: "Building the future of Indian retail analytics."
    };
  });

  // --- Support Assistant State ---
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Namaste! I'm your Vyaparmitra Assistant. How can I help you grow your business today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem('vip_site_config', JSON.stringify(siteConfig));
    document.documentElement.style.setProperty('--primary-color', siteConfig.primaryColor);
  }, [siteConfig]);

  const handleSupportSend = async () => {
    if (!supportMessage.trim()) return;
    const msg = supportMessage;
    setSupportMessage("");
    setChatHistory(prev => [...prev, { role: 'user', text: msg }]);
    setIsTyping(true);

    const aiResponse = await getSupportResponse(msg, []);
    setChatHistory(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsTyping(false);
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  };

  const EditableText = ({ id, value, className, multiline = false }: { id: string, value: string, className: string, multiline?: boolean }) => {
    if (!isEditMode) return <div className={className}>{value}</div>;
    
    return multiline ? (
      <textarea
        className={`${className} bg-blue-50/50 border-2 border-dashed border-blue-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none w-full min-h-[100px]`}
        value={value}
        onChange={(e) => setSiteConfig({ ...siteConfig, [id]: e.target.value })}
      />
    ) : (
      <input
        className={`${className} bg-blue-50/50 border-2 border-dashed border-blue-300 rounded-lg p-2 focus:border-blue-500 focus:outline-none w-full text-center`}
        value={value}
        onChange={(e) => setSiteConfig({ ...siteConfig, [id]: e.target.value })}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 relative overflow-x-hidden">
      {/* --- Admin/Flex Mode Toggle --- */}
      <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-start gap-3">
        {isEditMode && (
          <div className="flex bg-white border border-slate-200 rounded-2xl p-2 gap-2 shadow-2xl animate-fade-in mb-2">
            <div className="flex flex-col gap-1 items-center px-2">
              <Palette className="h-4 w-4 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400">THEME</span>
            </div>
            {['#2563eb', '#7c3aed', '#059669', '#dc2626', '#1e293b'].map(color => (
              <button
                key={color}
                onClick={() => setSiteConfig({...siteConfig, primaryColor: color})}
                className="w-10 h-10 rounded-xl transition-transform hover:scale-110 active:scale-90 shadow-sm border-2 border-white"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 px-6 py-4 rounded-2xl shadow-2xl transition-all duration-500 transform ${isEditMode ? 'bg-emerald-600 text-white hover:scale-105' : 'bg-slate-900 text-white hover:scale-110'}`}
        >
          {isEditMode ? <Check className="h-5 w-5" /> : <Edit3 className="h-5 w-5" />}
          <span className="font-bold text-sm hidden sm:inline">{isEditMode ? 'Save Changes' : 'Customize Platform'}</span>
        </button>
      </div>

      {/* --- Support Assistant Trigger --- */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button 
          onClick={() => setIsSupportOpen(!isSupportOpen)}
          className="bg-blue-600 text-white p-4 sm:p-5 rounded-full shadow-2xl hover:scale-110 hover:rotate-12 transition-all duration-500 group relative border-4 border-white"
          style={{ backgroundColor: siteConfig.primaryColor }}
        >
          {isSupportOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          {!isSupportOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
          )}
        </button>
      </div>

      {/* --- Support Assistant Window --- */}
      <div className={`fixed bottom-24 right-6 w-full sm:w-[400px] max-w-[calc(100vw-3rem)] bg-white rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.25)] z-[100] overflow-hidden transition-all duration-500 transform origin-bottom-right border border-slate-100 ${isSupportOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-blue-600 p-6 text-white" style={{ backgroundColor: siteConfig.primaryColor }}>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2.5 rounded-2xl shadow-inner"><Sparkles className="h-6 w-6" /></div>
            <div>
              <h4 className="font-bold text-lg">Vyaparmitra Assistant</h4>
              <p className="text-xs text-white/80 font-medium">Empowering Indian Retail</p>
            </div>
          </div>
        </div>
        <div className="h-[400px] sm:h-[450px] overflow-y-auto p-6 space-y-4 bg-slate-50/80 scroll-smooth">
          {chatHistory.map((chat, i) => (
            <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-[1.25rem] text-sm leading-relaxed ${
                chat.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-100' 
                  : 'bg-white text-slate-800 border border-slate-200/50 rounded-tl-none shadow-sm'
              }`} style={chat.role === 'user' ? { backgroundColor: siteConfig.primaryColor } : {}}>
                {chat.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1.5 shadow-sm">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>
        <div className="p-5 border-t border-slate-100 bg-white">
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Ask away..." 
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSupportSend()}
              className="flex-1 bg-slate-100/50 border-2 border-transparent rounded-[1.25rem] px-5 py-3 text-sm focus:bg-white focus:border-blue-500/20 focus:ring-0 focus:outline-none transition-all"
            />
            <button 
              onClick={handleSupportSend}
              className="bg-blue-600 text-white p-3.5 rounded-[1.25rem] hover:scale-105 active:scale-95 transition-all shadow-lg"
              style={{ backgroundColor: siteConfig.primaryColor }}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100/50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={(e) => scrollToSection(e as any, 'home')}
            >
              <div className="p-2 rounded-[0.9rem] group-hover:scale-110 transition-all duration-500 shadow-sm" style={{ backgroundColor: siteConfig.primaryColor }}>
                <PieChart className="text-white h-6 w-6" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Vyaparmitra</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-10 text-sm font-bold text-slate-600">
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-blue-600 transition-colors uppercase tracking-widest">Features</a>
              <a href="#solutions" onClick={(e) => scrollToSection(e, 'solutions')} className="hover:text-blue-600 transition-colors uppercase tracking-widest">Solutions</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-blue-600 transition-colors uppercase tracking-widest">Contact</a>
              <button 
                onClick={onStart}
                className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 transition-all shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] active:scale-95 font-bold uppercase tracking-wider"
              >
                Launch Dashboard
              </button>
            </div>

            <button 
              className="lg:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden bg-white border-b border-slate-100 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-6 py-8 flex flex-col gap-6 text-sm font-bold text-slate-600">
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-blue-600 transition-colors uppercase tracking-widest">Features</a>
            <a href="#solutions" onClick={(e) => scrollToSection(e, 'solutions')} className="hover:text-blue-600 transition-colors uppercase tracking-widest">Solutions</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-blue-600 transition-colors uppercase tracking-widest">Contact</a>
            <button 
              onClick={onStart}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all font-black uppercase tracking-wider text-center"
            >
              Launch Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative pt-32 pb-10 lg:pt-52 lg:pb-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-50/60 rounded-full blur-[120px] opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50/60 rounded-full blur-[120px] opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Floating Trust Badges - hidden on mobile for better UX */}
          <div className="absolute left-[5%] top-[20%] hidden xl:flex items-center gap-3 bg-white p-4 rounded-2xl shadow-xl animate-float border border-slate-100 z-20">
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600"><TrendingUp className="h-5 w-5" /></div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Tracked</p>
              <p className="text-sm font-bold text-slate-900">₹4.2 Cr Revenue</p>
            </div>
          </div>

          <div className="absolute right-[5%] top-[40%] hidden xl:flex items-center gap-3 bg-white p-4 rounded-2xl shadow-xl animate-float border border-slate-100 z-20" style={{ animationDelay: '1.5s' }}>
            <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><ShieldCheck className="h-5 w-5" /></div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance</p>
              <p className="text-sm font-bold text-slate-900">GST-Ready AI</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-6 sm:py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] mb-8 sm:mb-12 animate-fade-in shadow-sm" style={{ backgroundColor: `${siteConfig.primaryColor}08`, color: siteConfig.primaryColor, borderColor: `${siteConfig.primaryColor}15` }}>
            <Award className="h-3 sm:h-4 w-3 sm:w-4" />
            <span>Top-Rated BI Solution 2025</span>
          </div>
          
          <div className="relative inline-block px-2">
             <EditableText 
               id="heroTitle" 
               value={siteConfig.heroTitle} 
               className="text-4xl sm:text-6xl md:text-8xl lg:text-[100px] font-black text-slate-900 tracking-tighter mb-8 sm:mb-10 leading-[1.1] sm:leading-[0.92] animate-slide-up" 
             />
             <div className="absolute -top-4 -right-6 sm:-top-6 sm:-right-12">
               <Zap className="h-8 w-8 sm:h-12 sm:w-12 text-amber-400 rotate-12 animate-pulse" />
             </div>
          </div>
          
          <EditableText 
            id="heroDesc" 
            value={siteConfig.heroDesc} 
            multiline
            className="text-base sm:text-lg md:text-2xl text-slate-500 max-w-4xl mx-auto mb-12 sm:mb-16 px-4 leading-relaxed animate-slide-up font-medium" 
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 sm:mb-24 px-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={onStart}
              className="w-full sm:w-auto flex items-center justify-center gap-4 text-white px-8 py-5 sm:px-14 sm:py-6 rounded-2xl sm:rounded-[2rem] font-black text-lg sm:text-xl hover:brightness-110 transition-all shadow-xl active:scale-95"
              style={{ backgroundColor: siteConfig.primaryColor }}
            >
              Get Started Now
              <ArrowRight className="h-5 sm:h-6 w-5 sm:w-6" />
            </button>
            <button 
              onClick={() => alert("Redirecting to Calendar...")}
              className="w-full sm:w-auto flex items-center justify-center gap-4 bg-white text-slate-900 border-2 border-slate-200 px-8 py-5 sm:px-14 sm:py-6 rounded-2xl sm:rounded-[2rem] font-black text-lg sm:text-xl hover:bg-slate-50 transition-all active:scale-95 group"
            >
              <Calendar className="h-5 sm:h-6 w-5 sm:w-6" style={{ color: siteConfig.primaryColor }} /> Book Demo
            </button>
          </div>

          {/* Social Proof Section */}
          <div className="mb-16 sm:mb-24 px-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 sm:mb-10">Trusted by over 1,500+ Indian Retailers</p>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-6 sm:gap-x-12 sm:gap-y-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
              {['BHARAT RETAIL', 'ZEPTO', 'URBAN PLAZA', 'DESI TRENDS', 'MEGHA MART'].map(name => (
                <span key={name} className="text-sm sm:text-2xl font-black text-slate-900 tracking-tighter whitespace-nowrap">{name}</span>
              ))}
            </div>
          </div>

          {/* --- App Preview Card --- */}
          <div className="relative max-w-6xl mx-auto px-2 sm:px-4 perspective animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="absolute -inset-4 sm:-inset-8 rounded-[2rem] sm:rounded-[4rem] blur-[60px] sm:blur-[100px] opacity-20" style={{ backgroundColor: siteConfig.primaryColor }}></div>
            <div className="relative bg-white border border-slate-200 rounded-[1.5rem] sm:rounded-[3rem] shadow-2xl overflow-hidden tilt-card group">
              <div className="bg-slate-50/95 backdrop-blur-xl border-b border-slate-100 px-4 py-3 sm:px-10 sm:py-6 flex items-center gap-4 sm:gap-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-rose-400/80"></div>
                  <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-amber-400/80"></div>
                  <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-emerald-400/80"></div>
                </div>
                <div className="flex-1 hidden xs:block">
                  <div className="bg-white/80 border border-slate-200 rounded-xl sm:rounded-2xl px-3 py-1 sm:px-6 sm:py-3 text-[10px] sm:text-sm text-slate-400 font-bold flex items-center justify-center gap-2 sm:gap-3 max-w-xs sm:max-w-lg mx-auto shadow-inner">
                    <Lock className="h-3 sm:h-4 w-3 sm:w-4" /> app.vyaparmitra.in
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                  alt="Platform Preview" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Floating UI Elements over preview - Hidden on very small screens */}
                <div className="absolute bottom-4 right-4 sm:bottom-12 sm:right-12 w-48 sm:w-80 bg-white/95 backdrop-blur-3xl border border-white/50 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl animate-float border-l-4 sm:border-l-8 hidden xs:block" style={{ borderLeftColor: siteConfig.primaryColor }}>
                   <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                      <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg" style={{ backgroundColor: siteConfig.primaryColor }}><Zap className="h-4 sm:h-6 w-4 sm:w-6 text-white" /></div>
                      <div>
                        <span className="text-[8px] sm:text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] block">Growth Insight</span>
                      </div>
                   </div>
                   <p className="text-xs sm:text-lg font-black text-slate-900 leading-tight">
                     Potential <span className="text-emerald-600">₹8.4 Lakhs</span> monthly saving found.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section id="features" className="py-20 sm:py-40 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="font-black tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-6" style={{ color: siteConfig.primaryColor }}>Advantages</h2>
           <p className="text-3xl sm:text-6xl font-black text-slate-900 tracking-tighter mb-12 sm:mb-24">Precision analytics for retailers.</p>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
             {[
               { icon: BarChart3, title: 'Real-time Analytics', desc: 'Monitor your KPIs in live INR with automated data pipelines from your POS.' },
               { icon: Layers, title: 'Smart Inventory', desc: 'Avoid overstocking and stockouts with our predictive velocity-based engine.' },
               { icon: Users, title: 'Growth Strategies', desc: 'Get automated cross-selling suggestions to keep your customers coming back.' }
             ].map((f, i) => (
               <div key={i} className="p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 hover:border-blue-100 transition-all bg-slate-50/20 text-left">
                 <div className="w-16 h-16 sm:w-20 h-20 rounded-[1.25rem] sm:rounded-[1.5rem] flex items-center justify-center mb-8 sm:mb-10 shadow-xl" style={{ backgroundColor: `${siteConfig.primaryColor}` }}>
                   <f.icon className="h-8 sm:h-10 w-8 sm:w-10 text-white" />
                 </div>
                 <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">{f.title}</h3>
                 <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-semibold">{f.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-20 sm:py-40 bg-slate-50 scroll-mt-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="animate-fade-in text-center lg:text-left">
              <h2 className="font-black tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-6" style={{ color: siteConfig.primaryColor }}>Contact</h2>
              <h3 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter mb-8 sm:mb-10 leading-tight">Ready to scale?</h3>
              <p className="text-lg sm:text-xl text-slate-600 mb-10 sm:mb-16 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Our team is ready to provide a custom strategy for your retail operations.
              </p>

              <div className="space-y-6 sm:space-y-10 text-left">
                {[
                  { icon: MapPin, label: 'Headquarters', id: 'contactAddress' },
                  { icon: Mail, label: 'Email Us', id: 'contactEmail' },
                  { icon: Phone, label: 'Call Support', id: 'contactPhone' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 sm:gap-6 items-start group">
                    <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
                      <item.icon className="h-5 sm:h-6 w-5 sm:w-6" style={{ color: siteConfig.primaryColor }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                      <EditableText id={item.id} value={siteConfig[item.id]} className="text-base sm:text-lg font-bold text-slate-900" multiline={idx===0} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 sm:p-14 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl border border-slate-100 animate-slide-up">
              <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 sm:mb-8 tracking-tight">Send an Inquiry</h4>
              <div className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Full Name</label>
                    <input type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 sm:px-6 py-3 sm:py-4 text-sm font-bold focus:bg-white focus:border-blue-500/20 focus:outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Company</label>
                    <input type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 sm:px-6 py-3 sm:py-4 text-sm font-bold focus:bg-white focus:border-blue-500/20 focus:outline-none transition-all" placeholder="Retail Hub" />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Message</label>
                  <textarea className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 sm:px-6 py-3 sm:py-4 text-sm font-bold focus:bg-white focus:border-blue-500/20 focus:outline-none transition-all h-24 sm:h-32 resize-none" placeholder="Your goals..."></textarea>
                </div>
                <button 
                  className="w-full text-white font-black py-4 sm:py-6 rounded-[1.25rem] sm:rounded-[1.5rem] text-lg sm:text-xl hover:brightness-110 active:scale-95 transition-all shadow-xl"
                  style={{ backgroundColor: siteConfig.primaryColor }}
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-950 text-slate-400 py-16 sm:py-32 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-16 mb-16 sm:mb-24">
            <div className="md:col-span-2 space-y-6 sm:space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-lg" style={{ backgroundColor: siteConfig.primaryColor }}>
                  <PieChart className="text-white h-6 sm:h-8 w-6 sm:w-8" />
                </div>
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tighter">Vyaparmitra</span>
              </div>
              <EditableText id="footerTagline" value={siteConfig.footerTagline} className="text-lg sm:text-xl font-semibold text-slate-400 max-w-sm" multiline />
              <div className="flex gap-4">
                 {[Smartphone, Globe, Lock].map((Icon, i) => (
                   <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer border border-white/5">
                      <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-slate-400" />
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="space-y-6 sm:space-y-8">
              <h5 className="text-white font-black uppercase tracking-widest text-[10px] sm:text-xs">Navigation</h5>
              <div className="flex flex-col gap-3 sm:gap-5 font-bold">
                <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-white transition-colors">Home</a>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-white transition-colors">Features</a>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <h5 className="text-white font-black uppercase tracking-widest text-[10px] sm:text-xs">Legal</h5>
              <div className="flex flex-col gap-3 sm:gap-5 font-bold">
                <a href="#" className="hover:text-white transition-colors">Security</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 sm:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 tracking-[0.2em] uppercase">© 2025 Vyaparmitra Analytics. Built for India.</p>
            <div className="flex items-center gap-3">
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[9px] sm:text-[11px] font-black text-slate-500 uppercase tracking-widest">Platform Status: Fully Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
