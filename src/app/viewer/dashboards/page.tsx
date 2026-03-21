'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ViewerDashboards() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<any>(null);

  const dashboards = [
    { id: 1, title: 'ملخص المبيعات اليومي', category: 'المالية', lastViewed: 'منذ ساعة', color: 'blue' },
    { id: 2, title: 'أداء الفرق الربع سنوي', category: 'الموارد البشرية', lastViewed: 'منذ يومين', color: 'purple' },
    { id: 3, title: 'تحليل سلوك العملاء', category: 'التسويق', lastViewed: 'منذ أسبوع', color: 'emerald' },
  ];

  const openPreview = (dash: any) => {
    setSelectedDashboard(dash);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">لوحات البيانات المشتركة</h1>
        <p className="text-slate-500 dark:text-slate-400">جميع اللوحات التي تم منحك صلاحية الوصول إليها للعرض فقط.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboards.map((dash, i) => (
          <div key={i} className="group bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className={`w-12 h-12 rounded-2xl bg-${dash.color}-500/10 flex items-center justify-center text-${dash.color}-500 mb-6 group-hover:scale-110 transition-transform`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{dash.title}</h3>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 font-bold">{dash.category}</span>
              <span>•</span>
              <span>شوهد {dash.lastViewed}</span>
            </div>
            <button 
              onClick={() => openPreview(dash)}
              className="mt-6 w-full py-3 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition"
            >
              فتح اللوحة
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isPreviewOpen && selectedDashboard && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsPreviewOpen(false)}
               className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
             >
                <div className="p-4 border-b border-slate-100 dark:border-[#1A2A4A] flex justify-between items-center bg-slate-50 dark:bg-[#0D1632]">
                   <button onClick={() => setIsPreviewOpen(false)} className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-500 text-xs font-bold hover:bg-rose-500/20 transition-colors">إغلاق</button>
                   <div className="flex items-center gap-3" dir="rtl">
                      <h2 className="text-lg font-black text-slate-900 dark:text-white">{selectedDashboard.title}</h2>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-500 border border-blue-500/30">View Only Mode</span>
                   </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-8" dir="rtl">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#1A2A4A] rounded-2xl p-6">
                           <div className="h-2 w-12 bg-blue-500 rounded-full mb-4"></div>
                           <p className="text-2xl font-black text-slate-900 dark:text-white">١,٢٥٠</p>
                           <p className="text-xs text-slate-500">إحصائية تجريبية رقم {i}</p>
                        </div>
                      ))}
                   </div>
                   
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#1A2A4A] rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center">
                         <div className="w-full h-48 relative flex items-end justify-between gap-2 px-10">
                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                               <div key={i} style={{ height: `${h}%` }} className="w-full bg-blue-500 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"></div>
                            ))}
                         </div>
                         <p className="mt-8 text-sm font-bold text-slate-400">تحليل الأداء الأسبوعي</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#1A2A4A] rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center">
                         <div className="w-48 h-48 rounded-full border-[15px] border-blue-500/20 relative">
                            <div className="absolute inset-0 border-[15px] border-blue-500 border-l-transparent border-b-transparent rounded-full rotate-45"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                               <p className="text-2xl font-black text-slate-900 dark:text-white">٦٥٪</p>
                            </div>
                         </div>
                         <p className="mt-8 text-sm font-bold text-slate-400">نسبة تحقيق الأهداف</p>
                      </div>
                   </div>

                   <div className="bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#1A2A4A] rounded-3xl p-8">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 tracking-tight">قائمة العمليات الأخيرة</h3>
                      <div className="space-y-4">
                         {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-[#142247] rounded-xl border border-slate-100 dark:border-transparent">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#0D1632]"></div>
                                  <div>
                                     <p className="text-sm font-bold text-slate-900 dark:text-white">عملية مبيعات رقم #{i*1534}</p>
                                     <p className="text-[10px] text-slate-500">منذ {i*2} ساعة • الرياض، السعودية</p>
                                  </div>
                               </div>
                               <p className="text-sm font-black text-blue-500">٤٥٠.٠٠ ر.س</p>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
