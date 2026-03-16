'use client';

import { useState, useEffect } from 'react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

type DataRow = {
  id: string;
  cust_full_name: string;
  join_dt_01: string;
  total_spent: string | number;
  status?: string;
};

const mockData: DataRow[] = [
  { id: '#CUST-8821', cust_full_name: 'سليمان عبدالعزيز', join_dt_01: '12 أكتوبر 2023', total_spent: 4500, status: 'نشط' },
  { id: '#CUST-8822', cust_full_name: 'نورة السبيعي', join_dt_01: '14 أكتوبر 2023', total_spent: 12800, status: 'عميل مميز' },
  { id: '#CUST-8823', cust_full_name: 'N/A', join_dt_01: '05 أكتوبر 2023', total_spent: 'Null', status: '' },
  { id: '#CUST-8824', cust_full_name: 'محمد الغامدي', join_dt_01: '01 أكتوبر 2023', total_spent: 2150, status: 'نشط' },
  { id: '#CUST-8825', cust_full_name: 'ريم القحطاني', join_dt_01: '22 أكتوبر 2023', total_spent: 7320, status: 'نشط' },
];

export default function DataPrepPage() {
  const [mounted, setMounted] = useState(false);
  const [isCleaned, setIsCleaned] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleApplyRecommendations = () => {
      setIsApplying(true);
      setTimeout(() => {
          setIsCleaned(true);
          setIsApplying(false);
      }, 1500);
  };

  const filteredData = mockData.filter(row => 
    row.cust_full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    row.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-[1440px] p-3 md:p-5">
        <main className="flex-1 space-y-6">
          
          {/* Top Header Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] p-4 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                حفظ التعديلات
              </button>
              <button className="border border-slate-200 dark:border-[#1A2A4A] bg-slate-50 dark:bg-[#0D1632] hover:bg-slate-100 dark:hover:bg-[#142247] text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                تصفية
              </button>
            </div>
            
            <div className="flex-1 flex justify-end w-full sm:w-auto relative group">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="البحث في السجلات (الاسم، المعرف)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#1A2A4A] rounded-xl py-2.5 pr-10 pl-4 text-sm text-slate-900 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 border-l border-slate-200 dark:border-[#1A2A4A] ml-2 text-slate-500 dark:text-slate-400 text-xs font-mono">
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  ملف_العملاء.csv
                </span>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Records */}
            <div className="bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] p-5 rounded-2xl relative overflow-hidden group hover:border-blue-300 dark:hover:border-[#2b4172] transition-colors shadow-sm">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">إجمالي السجلات</h3>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  <AnimatedCounter value={12450} duration={1.5} />
                </p>
                <span className="text-emerald-600 dark:text-emerald-500 text-sm font-bold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  12% 
                </span>
              </div>
            </div>

            {/* Detected Columns */}
            <div className="bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] p-5 rounded-2xl relative overflow-hidden group hover:border-blue-300 dark:hover:border-[#2b4172] transition-colors shadow-sm">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">الأعمدة المكتشفة</h3>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  <AnimatedCounter value={18} duration={1} />
                </p>
                <span className="text-slate-500 text-xs">جاهز</span>
              </div>
            </div>

            {/* Data Quality */}
            <div className="bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] p-5 rounded-2xl relative overflow-hidden group hover:border-blue-300 dark:hover:border-[#2b4172] transition-colors shadow-sm">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">جودة البيانات</h3>
              <div className="flex items-end justify-between mb-3">
                <p className="text-3xl font-black text-emerald-500 dark:text-emerald-400 font-mono tracking-tight">
                  <AnimatedCounter value={isCleaned ? 100 : 96.4} decimals={isCleaned ? 0 : 1} duration={1.2} suffix="%" />
                </p>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-[#1A2A4A] rounded-full overflow-hidden">
                <div className={`h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out`} style={{ width: isCleaned ? '100%' : '96.4%' }} />
              </div>
            </div>

            {/* Potential Errors */}
            <div className="bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] p-5 rounded-2xl relative overflow-hidden group hover:border-rose-400 dark:hover:border-rose-500/30 transition-colors shadow-sm">
              <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl transition-colors duration-1000 ${isCleaned ? 'bg-emerald-500/10 dark:bg-emerald-500/5' : 'bg-rose-500/10 dark:bg-rose-500/5'}`} />
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">{isCleaned ? 'تمت معالجة الأخطاء' : 'الأخطاء المحتملة'}</h3>
              <div className="flex items-end justify-between">
                <p className={`text-3xl font-black font-mono tracking-tight transition-colors duration-1000 ${isCleaned ? 'text-emerald-500' : 'text-rose-500'}`}>
                  <AnimatedCounter value={isCleaned ? 0 : 24} duration={1} />
                </p>
                {!isCleaned && (
                    <button className="text-xs text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 font-bold underline underline-offset-4 decoration-blue-500/30">
                      عرض الأخطاء
                    </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Grid: AI Panel + Data Table */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Left AI Assistant Panel */}
            <div className={`xl:col-span-1 border border-blue-200 dark:border-blue-500/30 bg-white dark:bg-[#0A1126] p-5 rounded-2xl relative overflow-hidden flex flex-col transition-all duration-700 shadow-sm ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-50 dark:from-blue-600/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-4 font-bold relative z-10">
                <svg className={`w-5 h-5 ${isCleaned ? '' : 'animate-pulse'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                مساعد البيانات الذكي
              </div>

              {isCleaned ? (
                  <div className="flex flex-col items-center justify-center flex-1 relative z-10 py-8">
                      <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-4 animate-[scaleIn_0.5s_ease-out]">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 text-center">البيانات جاهزة!</h3>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400/80 text-center">تم تنظيف ومعالجة 24 خطأ محتمل بنجاح.</p>
                  </div>
              ) : (
                  <>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 relative z-10">
                        تم اكتشاف <span className="text-slate-900 dark:text-white font-bold">3</span> حقول بنوع بيانات <span className="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 px-1 rounded">نص</span> يمكن تحويلها إلى <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 px-1 rounded">تاريخ</span> أو <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 px-1 rounded">قيمة رقمية</span> لتحليل أفضل.
                      </p>

                      {/* Transformations list */}
                      <div className="space-y-3 relative z-10 flex-1">
                        <div className="bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#1A2A4A] rounded-xl p-3 flex items-center justify-between group">
                           <div className="flex items-center gap-2 border border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126] px-2 py-1 rounded-md">
                              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                              <span className="text-xs text-slate-700 dark:text-slate-300 font-mono">cust_full_name</span>
                           </div>
                           <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                           <div className="flex items-center gap-2 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-md">
                              <span className="text-xs text-blue-600 dark:text-blue-400 font-mono">الاسم الكامل</span>
                           </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#1A2A4A] rounded-xl p-3 flex items-center justify-between group">
                           <div className="flex items-center gap-2 border border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126] px-2 py-1 rounded-md">
                              <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                              <span className="text-xs text-slate-700 dark:text-slate-300 font-mono">join_dt_01</span>
                           </div>
                           <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                           <div className="flex items-center gap-2 border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
                              <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">Date</span>
                           </div>
                        </div>
                      </div>

                      <button 
                        onClick={handleApplyRecommendations}
                        disabled={isApplying}
                        className={`w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20 relative z-10 flex items-center justify-center gap-2 overflow-hidden ${isApplying ? 'cursor-not-allowed' : ''}`}
                      >
                        {isApplying ? (
                            <>
                                <div className="absolute inset-0 bg-white/20 animate-[pulse_1s_ease-in-out_infinite]" />
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                جاري المعالجة...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                تطبيق التوصيات
                            </>
                        )}
                      </button>
                  </>
              )}
            </div>

            {/* Right Data Table */}
            <div className={`xl:col-span-3 border border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126] rounded-2xl overflow-hidden flex flex-col transition-all duration-700 delay-100 shadow-sm ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              
              {/* Table Header Context */}
              <div className="p-4 border-b border-slate-200 dark:border-[#1A2A4A] flex justify-between items-center bg-slate-50/80 dark:bg-[#0D1632]/50">
                 <div className="flex items-center gap-4 text-sm font-bold">
                    <span className="text-slate-900 dark:text-white">معاينة أول 50 سجلاً</span>
                    <div className="flex gap-4 text-xs font-normal">
                       <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> بيانات صالحة
                       </span>
                       <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span> مفقود / خطأ
                       </span>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 rounded-md transition-colors" title="ملء الشاشة">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                    </button>
                    <button className="p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 rounded-md transition-colors" title="إعدادات الأعمدة">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                    </button>
                 </div>
              </div>

              {/* Table wrapper */}
              <div className="overflow-x-auto flex-1 pb-16">
                 <table className="w-full text-right border-collapse">
                     <thead>
                       <tr className="border-b border-slate-200 dark:border-[#1A2A4A] bg-slate-50 dark:bg-[#0A1126]">
                          <th className="p-4 w-12 text-center">
                             <input type="checkbox" className="rounded border-slate-300 dark:border-[#2b4172] bg-white dark:bg-[#0D1632] text-blue-500 focus:ring-blue-500/50 w-4 h-4" />
                          </th>
                          <th className="p-4 min-w-[120px]">
                             <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-mono text-xs mb-2">
                                <span className="font-bold text-blue-600 dark:text-blue-400">#</span>
                                id
                             </div>
                              {/* Quality Bar */}
                             <div className="space-y-1">
                                <div className="h-1 w-full bg-slate-200 dark:bg-[#1A2A4A] rounded-full overflow-hidden flex">
                                   <div className="h-full bg-emerald-500 w-full" />
                                </div>
                                <p className="text-[10px] text-emerald-600 dark:text-emerald-500">صالح 100%</p>
                             </div>
                          </th>
                          <th className="p-4 min-w-[180px]">
                             <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-mono text-xs mb-2 transition-colors">
                                <div className="flex items-center gap-2">
                                   {isCleaned ? (
                                      <span className="font-bold text-blue-600 dark:text-blue-400">#</span>
                                   ) : (
                                       <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                   )}
                                   <span className="transition-all">{isCleaned ? 'الاسم_الكامل' : 'cust_full_name'}</span>
                                </div>
                                <button className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></button>
                             </div>
                             <div className="space-y-1">
                                <div className="h-1 w-full bg-slate-200 dark:bg-[#1A2A4A] rounded-full overflow-hidden flex">
                                   <div className={`h-full bg-emerald-500 transition-all duration-1000`} style={{ width: isCleaned ? '100%' : '84%' }} />
                                   {!isCleaned && <div className="h-full bg-amber-500 w-[16%]" />}
                                </div>
                                <div className="flex justify-between text-[10px]">
                                   <span className="text-emerald-600 dark:text-emerald-500 transition-all">{isCleaned ? 'صالح 100%' : 'صالح 84%'}</span>
                                </div>
                             </div>
                          </th>
                          <th className="p-4 min-w-[150px]">
                             <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-mono text-xs mb-2">
                                <div className="flex items-center gap-2">
                                   {isCleaned ? (
                                       <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                   ) : (
                                       <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                   )}
                                   <span className="transition-all">{isCleaned ? 'تاريخ_الانضمام' : 'join_dt_01'}</span>
                                </div>
                                <button className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></button>
                             </div>
                             <div className="space-y-1">
                                <div className="h-1 w-full bg-slate-200 dark:bg-[#1A2A4A] rounded-full overflow-hidden flex">
                                   <div className="h-full bg-emerald-500 w-[100%]" />
                                </div>
                                <p className="text-[10px] text-emerald-600 dark:text-emerald-500">صالح 100%</p>
                             </div>
                          </th>
                          <th className="p-4 min-w-[120px]">
                             <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-mono text-xs mb-2">
                                <div className="flex items-center gap-2">
                                   <span className="font-bold text-emerald-600 dark:text-emerald-400">#</span>
                                   <span className="transition-all">{isCleaned ? 'إجمالي_المشتريات' : 'total_spent'}</span>
                                </div>
                                <button className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></button>
                             </div>
                             <div className="space-y-1">
                                <div className="h-1 w-full bg-slate-200 dark:bg-[#1A2A4A] rounded-full overflow-hidden flex">
                                   <div className={`h-full bg-emerald-500 transition-all duration-1000`} style={{ width: isCleaned ? '100%' : '70%' }} />
                                   {!isCleaned && <div className="h-full bg-rose-500 w-[30%]" />}
                                </div>
                                <div className="flex justify-between text-[10px]">
                                   {isCleaned ? (
                                       <span className="text-emerald-600 dark:text-emerald-500 transition-all">صالح 100%</span>
                                   ) : (
                                       <span className="text-rose-600 dark:text-rose-500 transition-all">مفقود 30%</span>
                                   )}
                                </div>
                             </div>
                          </th>
                       </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                       {filteredData.length > 0 ? (
                           filteredData.map((row) => (
                              <tr key={row.id} className="border-b border-slate-200 dark:border-[#1A2A4A] hover:bg-slate-50 dark:hover:bg-[#0D1632] transition-colors group">
                                 <td className="p-4 text-center">
                                    <input type="checkbox" className="rounded border-[#2b4172] bg-[#0A1126] text-blue-500 focus:ring-blue-500/50 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                 </td>
                                 <td className="p-4 text-slate-600 dark:text-slate-300 font-mono">{row.id}</td>
                                 <td className="p-4">
                                    {row.cust_full_name === 'N/A' && !isCleaned ? (
                                       <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded inline-flex border border-amber-200 dark:border-amber-500/20">
                                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                          N/A (مفقود)
                                       </div>
                                    ) : (
                                       <span className="text-slate-900 dark:text-white transition-opacity duration-500">{row.cust_full_name === 'N/A' ? 'مستخدم غير معروف' : row.cust_full_name}</span>
                                    )}
                                 </td>
                                 <td className="p-4 text-slate-600 dark:text-slate-300 font-mono tracking-wide">{row.join_dt_01}</td>
                                 <td className="p-4">
                                    {row.total_spent === 'Null' && !isCleaned ? (
                                       <span className="text-rose-600 dark:text-rose-500 font-bold font-mono">N/A</span>
                                    ) : (
                                       <div className="flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400 transition-opacity duration-500">
                                          <span className="text-slate-400 dark:text-slate-500">$</span>{row.total_spent === 'Null' ? '0' : row.total_spent.toLocaleString()}
                                       </div>
                                    )}
                                 </td>
                              </tr>
                           ))
                       ) : (
                           <tr>
                               <td colSpan={5} className="p-8 text-center text-slate-500">
                                   <svg className="w-8 h-8 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z" /></svg>
                                   لا توجد نتائج مطابقة لبحثك
                               </td>
                           </tr>
                       )}
                    </tbody>
                 </table>
              </div>

              {/* Pagination (Absolute at bottom for stable UI) */}
              <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#0A1126] border-t border-slate-200 dark:border-[#1A2A4A] p-3 flex justify-between items-center z-10">
                 <div className="flex items-center gap-1">
                    <button className="w-8 h-8 rounded border border-slate-200 dark:border-[#1A2A4A] flex items-center justify-center text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors" disabled>
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button className="w-8 h-8 rounded bg-blue-600 text-white font-bold shadow flex items-center justify-center">1</button>
                    <button className="w-8 h-8 rounded border border-slate-200 dark:border-[#1A2A4A] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors">2</button>
                    <button className="w-8 h-8 rounded border border-slate-200 dark:border-[#1A2A4A] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors">3</button>
                    <span className="text-slate-400 dark:text-slate-500 px-1">...</span>
                    <button className="w-8 h-8 rounded border border-slate-200 dark:border-[#1A2A4A] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors font-mono">1245</button>
                    <button className="w-8 h-8 rounded border border-slate-200 dark:border-[#1A2A4A] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                 </div>
                 
                 <div className="text-xs text-slate-500 font-mono tracking-widest hidden sm:block">
                    1-10 <span className="text-slate-300 dark:text-[#1A2A4A]">|||||</span> 12,450
                 </div>
               </div>
            </div>
          </div>
        </main>
    </div>
  );
}
