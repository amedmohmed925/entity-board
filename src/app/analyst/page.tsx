'use client';

import { useState, useEffect } from 'react';

type Connector = {
    id: string;
    name: string;
    description: string;
    iconUrl: string;
    color: string;
    category: 'all' | 'ads' | 'ecommerce';
};

type ConnectedSource = {
    id: string;
    connectorId: string;
    name: string;
    status: 'active' | 'error' | 'syncing';
    lastUpdate: string;
    signalStrength: number;
    color: string;
};

const popularConnectors: Connector[] = [
    {
        id: 'google-analytics',
        name: 'Google Analytics',
        description: 'تحليل الزوار وسلوك المستخدمين عبر القنوات المختلفة.',
        iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', // generic replacement, will use SVG below
        color: 'rose',
        category: 'ads'
    },
    {
        id: 'shopify',
        name: 'Shopify',
        description: 'تزامن المبيعات، المخزون وبيانات العملاء لحظياً.',
        iconUrl: '',
        color: 'emerald',
        category: 'ecommerce'
    },
    {
        id: 'stripe',
        name: 'Stripe',
        description: 'تتبع الإيرادات، المدفوعات، والعمليات المالية المعقدة.',
        iconUrl: '',
        color: 'blue',
        category: 'ecommerce'
    },
    {
        id: 'facebook-ads',
        name: 'Facebook Ads',
        description: 'تحليل أداء الحملات الإعلانية ومعدلات التحويل.',
        iconUrl: '',
        color: 'blue',
        category: 'ads'
    },
    {
        id: 'mailchimp',
        name: 'Mailchimp',
        description: 'تتبع أداء النشرات البريدية وتفاعل المشتركين.',
        iconUrl: '',
        color: 'amber',
        category: 'all' // placing it in all for now
    },
    {
        id: 'postgresql',
        name: 'PostgreSQL',
        description: 'اتصال مباشر بقاعدة البيانات لاستخراج تقارير مخصصة.',
        iconUrl: '',
        color: 'slate',
        category: 'all'
    }
];

function ConnectorIcon({ id, color }: { id: string, color: string }) {
    // Return specific SVG paths based on ID to match the design's colorful icons in rounded squares
    const baseClasses = `h-10 w-10 flex items-center justify-center rounded-xl mb-4`;
    
    if (id === 'google-analytics') {
        return (
            <div className={`${baseClasses} bg-[#3E1C22] text-rose-500`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
        );
    }
    if (id === 'shopify') {
        return (
            <div className={`${baseClasses} bg-[#143022] text-emerald-500`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            </div>
        );
    }
    if (id === 'stripe') {
        return (
            <div className={`${baseClasses} bg-[#1D2B4A] text-blue-500`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
            </div>
        );
    }
    if (id === 'facebook-ads') {
        return (
            <div className={`${baseClasses} bg-[#1E2640] text-blue-400`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
            </div>
        );
    }
    if (id === 'mailchimp') {
        return (
            <div className={`${baseClasses} bg-[#3D2C1D] text-amber-500`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
        );
    }
    if (id === 'postgresql') {
        return (
            <div className={`${baseClasses} bg-[#232A3B] text-slate-400`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
            </div>
        );
    }
    return <div className={`${baseClasses} bg-slate-800 text-white`} />;
}

export default function AnalystConnectorsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'ads' | 'ecommerce'>('all');
  
  // Modals state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  
  // State for interactivity
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectedSources, setConnectedSources] = useState<ConnectedSource[]>([
      {
          id: 'mock-1',
          connectorId: 'shopify',
          name: 'Shopify Store',
          status: 'active',
          lastUpdate: 'تم التحديث منذ ٥ دقائق',
          signalStrength: 98,
          color: 'emerald'
      },
      {
          id: 'mock-2',
          connectorId: 'google-analytics',
          name: 'GA4 - Global',
          status: 'error',
          lastUpdate: 'الرمز منتهي الصلاحية',
          signalStrength: 0,
          color: 'rose'
      }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = (connector: Connector) => {
      // Don't connect if already connected or currently connecting
      if (connectingId || connectedSources.some(s => s.connectorId === connector.id)) return;
      
      setConnectingId(connector.id);
      
      // Simulate network request
      setTimeout(() => {
          const newSource: ConnectedSource = {
              id: `src-${Date.now()}`,
              connectorId: connector.id,
              name: `${connector.name} Integration`,
              status: 'active',
              lastUpdate: 'تم الاتصال للتو',
              signalStrength: 100,
              color: connector.color
          };
          
          setConnectedSources(prev => [newSource, ...prev]);
          setConnectingId(null);
      }, 1500);
  };

  const filteredConnectors = activeTab === 'all' 
    ? popularConnectors 
    : popularConnectors.filter(c => c.category === activeTab || c.category === 'all');

  // Helper to get Tailwind color classes based on color string
  const getColorClasses = (color: string) => {
      switch(color) {
          case 'emerald': return { bg: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-500', textMuted: 'text-emerald-500 dark:text-emerald-400', bgMuted: 'bg-emerald-50 dark:bg-emerald-500/10' };
          case 'rose': return { bg: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-500', textMuted: 'text-rose-500 dark:text-rose-400', bgMuted: 'bg-rose-50 dark:bg-rose-500/10' };
          case 'blue': return { bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-500', textMuted: 'text-blue-500 dark:text-blue-400', bgMuted: 'bg-blue-50 dark:bg-blue-500/10' };
          case 'amber': return { bg: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-500', textMuted: 'text-amber-500 dark:text-amber-400', bgMuted: 'bg-amber-50 dark:bg-amber-500/10' };
          case 'slate': return { bg: 'bg-slate-500', text: 'text-slate-600 dark:text-slate-500', textMuted: 'text-slate-500 dark:text-slate-400', bgMuted: 'bg-slate-100 dark:bg-slate-500/10' };
          default: return { bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-500', textMuted: 'text-blue-500 dark:text-blue-400', bgMuted: 'bg-blue-50 dark:bg-blue-500/10' };
      }
  };

  return (
    <div className="mx-auto max-w-[1440px] p-3 md:p-5">
      <main className="flex flex-col xl:flex-row gap-6">
          
          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
             {/* Header */}
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                   <h1 className="text-3xl font-black text-slate-900 dark:text-white">مصادر البيانات والموصلات</h1>
                   <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">اربط أدواتك لإنشاء تدفق بيانات متكامل لمشروعك</p>
                </div>
                <button onClick={() => setCustomModalOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5">
                   <span className="text-xl leading-none">+</span>
                   طلب موصل مخصص
                </button>
             </div>

             {/* Direct Upload Area */}
             <div className="relative overflow-hidden rounded-2xl border border-dashed border-slate-300 dark:border-[#2A375A] bg-white/50 dark:bg-[#0A1126]/50 p-10 text-center transition-colors hover:bg-slate-50/80 dark:hover:bg-[#0D1632]/80 group cursor-pointer shadow-sm">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-[#132042] text-blue-600 dark:text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                   <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                   </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">رفع الملفات المباشر</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">اسحب وأفلت الملفات هنا أو انقر للتصفح</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">يدعم صيغ CSV, Excel, JSON (الحد الأقصى 50 ميجابايت)</p>
                
                <button onClick={() => setUploadModalOpen(true)} className="rounded-full border border-slate-200 dark:border-[#2A375A] bg-white dark:bg-[#0D1632] px-6 py-2 text-sm font-semibold text-slate-700 dark:text-white transition hover:bg-slate-50 dark:hover:bg-[#1A2A4A] relative z-10 shadow-sm">
                   تصفح الجهاز
                </button>
             </div>

             {/* Popular Connectors Section */}
             <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        الموصلات الشائعة
                    </h2>
                    
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#0A1126] p-1 rounded-xl border border-slate-200 dark:border-[#1A2A4A]">
                        <button 
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'}`}
                        >
                            الكل
                        </button>
                        <button 
                            onClick={() => setActiveTab('ads')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'ads' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'}`}
                        >
                            إعلانات
                        </button>
                        <button 
                            onClick={() => setActiveTab('ecommerce')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'ecommerce' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'}`}
                        >
                            تجارة إلكترونية
                        </button>
                    </div>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                    {filteredConnectors.map((connector, i) => {
                        const isConnected = connectedSources.some(s => s.connectorId === connector.id);
                        const isConnecting = connectingId === connector.id;
                        
                        return (
                            <div key={connector.id} className={`group relative rounded-2xl border ${isConnected ? 'border-emerald-500/30 bg-white dark:bg-[#0A1126]' : 'border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126]'} p-5 transition-all hover:bg-slate-50 dark:hover:bg-[#0D1632] ${!isConnected && 'hover:border-blue-500/30 hover:-translate-y-1 shadow-md hover:shadow-blue-500/10'} overflow-hidden mt-2`} style={{ transitionDelay: `${i * 50}ms`, transform: mounted ? 'translateY(0)' : 'translateY(10px)' }}>
                                <div className="absolute top-4 left-4 transition-opacity">
                                    {isConnecting ? (
                                        <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    ) : isConnected ? (
                                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                    ) : (
                                        <button onClick={() => handleConnect(connector)} className="h-8 w-8 rounded-full bg-slate-100 dark:bg-[#1A2A4A] flex items-center justify-center text-slate-700 dark:text-white hover:bg-blue-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                        </button>
                                    )}
                                </div>
                                
                                <ConnectorIcon id={connector.id} color={connector.color} />
                                
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    {connector.name}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{connector.description}</p>
                            </div>
                        );
                    })}
                </div>
             </div>
          </div>

          {/* Right Sidebar: Connected Sources */}
          <div className="w-full xl:w-80 shrink-0 flex flex-col gap-4">
             <div className="flex items-center gap-2 mb-2">
                 <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                 </svg>
                 <h2 className="text-lg font-bold text-slate-900 dark:text-white">المصادر المتصلة</h2>
             </div>

             {/* Connected Sources Map */}
             {connectedSources.map((source, index) => {
                 const colors = getColorClasses(source.color);
                 const isNew = index === 0 && source.id.startsWith('src-'); // Simple visual pulse for newly added
                 
                 return (
                     <div key={source.id} className="rounded-2xl border border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126] p-4 relative overflow-hidden group hover:border-slate-300 dark:hover:border-[#2A375A] transition-all shadow-sm" style={{ animation: isNew ? 'slideDown 0.5s ease-out forwards' : 'none' }}>
                        <div className={`absolute top-0 right-0 w-1 rounded-l-full ${colors.bg} h-full ${source.status === 'active' ? 'opacity-50 group-hover:opacity-100' : 'opacity-80'}`} />
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3">
                                <div className={`h-10 w-10 shrink-0 rounded-xl ${colors.bgMuted} ${colors.text} flex items-center justify-center`}>
                                    <ConnectorIcon id={source.connectorId} color={source.color} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        {source.name}
                                        <span className={`h-1.5 w-1.5 rounded-full ${colors.bg} ${source.status === 'active' ? 'animate-pulse' : ''}`} />
                                    </h3>
                                    {source.status === 'error' ? (
                                        <p className="text-[10px] text-rose-500 dark:text-rose-400/80 mt-1 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            خطأ في الاتصال
                                        </p>
                                    ) : (
                                        <p className="text-[10px] text-slate-500 mt-1">{source.lastUpdate}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-4 pt-4 border-t border-slate-100 dark:border-[#1A2A4A]">
                            {source.status === 'error' ? (
                                <>
                                    <span className="text-slate-500">{source.lastUpdate}</span>
                                    <button className="text-rose-500 font-bold hover:text-rose-600 dark:hover:text-rose-400 focus:outline-none">إعادة ربط</button>
                                </>
                            ) : (
                                <>
                                    <span className="text-slate-500 dark:text-slate-400">قوة الإشارة: {source.signalStrength}٪</span>
                                    <button className="text-blue-600 dark:text-blue-500 font-medium hover:text-blue-700 dark:hover:text-blue-400 focus:outline-none flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        الإعدادات
                                    </button>
                                </>
                            )}
                        </div>
                     </div>
                 );
             })}

             {/* Static Source Card: File Upload (Keep this as an example of manual uploads) */}
             <div className="rounded-2xl border border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126] p-4 relative overflow-hidden group shadow-sm">
                <div className="absolute top-0 right-0 w-1 rounded-l-full bg-blue-600 h-full opacity-30 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                        <div className="h-8 w-8 shrink-0 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                Sales_2023.csv
                                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                            </h3>
                            <p className="text-[10px] text-slate-500 mt-1">تم الرفع في 1 ديسمبر</p>
                        </div>
                    </div>
                </div>
                {/* Progress bar simulation for a recent upload */}
                <div className="mt-4">
                    <div className="h-1 w-full bg-slate-100 dark:bg-[#1A2A4A] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full w-full" />
                    </div>
                </div>
             </div>

             <button className="w-full mt-2 py-3 rounded-2xl border border-slate-300 dark:border-[#1A2A4A] border-dashed text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#0A1126] hover:text-slate-900 dark:hover:text-white transition-colors">
                 + عرض كافة المصادر
             </button>
          </div>

        </main>

        {/* File Upload Modal Overlay */}
        {uploadModalOpen && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 min-h-screen">
                 {/* Backdrop */}
                 <div className="absolute inset-0 bg-slate-900/60 dark:bg-[#0A1126]/80 backdrop-blur-sm" onClick={() => setUploadModalOpen(false)}></div>
                 
                 {/* Modal Content */}
                 <div className="bg-white dark:bg-[#0D1632] border border-slate-200 dark:border-[#1A2A4A] rounded-3xl w-full max-w-lg p-8 shadow-2xl relative z-10 animate-[scaleIn_0.3s_ease-out]">
                     <button onClick={() => setUploadModalOpen(false)} className="absolute top-6 left-6 text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                     </button>
                     
                     <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 mb-6 border border-blue-100 dark:border-blue-500/20">
                         <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                         </svg>
                     </div>
                     
                     <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-3">رفع الملفات المباشر</h2>
                     <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-8 px-4 leading-relaxed">قم بتحديد الملفات من جهازك لرفعها وتجهيزها للتحليل. تأكد من أن الملفات بالتنسيقات المدعومة.</p>
                     
                     <div className="border-2 border-dashed border-slate-300 dark:border-[#2A375A] rounded-2xl p-10 mb-8 flex flex-col items-center justify-center group hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-colors cursor-pointer bg-slate-50 dark:bg-[#0A1126]">
                         <svg className="w-12 h-12 text-slate-400 dark:text-slate-500 mb-4 group-hover:text-blue-500 transition-colors duration-300 transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                         <span className="text-slate-700 dark:text-white font-bold mb-2">انقر هنا لاختيار الملفات</span>
                         <span className="text-slate-500 text-sm text-center">أو اسحب الملفات وأفلتها هنا<br/><span className="mt-1 inline-block text-xs">يدعم CSV, Excel, JSON</span></span>
                     </div>
                     
                     <button onClick={() => setUploadModalOpen(false)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20 text-lg">
                         تأكيد الرفع
                     </button>
                 </div>
             </div>
        )}

        {/* Custom Connector Modal Overlay */}
        {customModalOpen && (
             <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 min-h-screen">
                 {/* Backdrop */}
                 <div className="absolute inset-0 bg-slate-900/60 dark:bg-[#0A1126]/80 backdrop-blur-sm" onClick={() => setCustomModalOpen(false)}></div>
                 
                 {/* Modal Content */}
                 <div className="bg-white dark:bg-[#0D1632] border border-slate-200 dark:border-[#1A2A4A] rounded-3xl w-full max-w-lg p-8 shadow-2xl relative z-10 animate-[scaleIn_0.3s_ease-out]">
                     <button onClick={() => setCustomModalOpen(false)} className="absolute top-6 left-6 text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                     </button>
                     
                     <div className="flex items-center gap-4 mb-6">
                         <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-[#1A2A4A] text-slate-700 dark:text-white flex items-center justify-center border border-slate-200 dark:border-[#2A375A]">
                             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                         </div>
                         <div>
                             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">طلب موصل مخصص</h2>
                             <p className="text-slate-500 dark:text-slate-400 text-sm">دعنا نساعدك في ربط أي نظام</p>
                         </div>
                     </div>
                     
                     <div className="space-y-5 mb-8">
                         <div>
                             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">اسم النظام أو المنصة <span className="text-rose-500">*</span></label>
                             <input type="text" className="w-full bg-slate-50 dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] rounded-xl px-4 py-3.5 text-slate-900 dark:text-white dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors shadow-inner" placeholder="مثال: نظام تخطيط الموارد الخاص بالشركة" />
                         </div>
                         <div>
                             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">نوع الربط المفضل (إذا كان معروفاً)</label>
                             <select className="w-full bg-slate-50 dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors shadow-inner appearance-none">
                                 <option>واجهة برمجية (API Webhook)</option>
                                 <option>ربط مباشر بقاعدة البيانات</option>
                                 <option>مزامنة ملفات مجدولة (SFTP)</option>
                                 <option>غير متأكد - أحتاج إلى اختيار الأنسب</option>
                             </select>
                         </div>
                         <div>
                             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">ملاحظات إضافية (اختياري)</label>
                             <textarea rows={4} className="w-full bg-slate-50 dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] rounded-xl px-4 py-3.5 text-slate-900 dark:text-white dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors shadow-inner resize-none" placeholder="أي تفاصيل حول طبيعة البيانات أو رابط لتوثيق المنصة..."></textarea>
                         </div>
                     </div>
                     
                     <div className="flex gap-4">
                         <button onClick={() => setCustomModalOpen(false)} className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20 text-lg">
                             إرسال الطلب
                         </button>
                         <button onClick={() => setCustomModalOpen(false)} className="flex-1 bg-[#1A2A4A] hover:bg-[#2A375A] text-white font-bold py-4 rounded-xl transition-colors text-lg">
                             إلغاء
                         </button>
                     </div>
                 </div>
             </div>
        )}
    </div>
  );
}
