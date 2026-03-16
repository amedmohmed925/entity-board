'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReportsExportPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  const [isScheduled, setIsScheduled] = useState(false);
  
  // Export Modal State
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Preview Modal State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setExportSuccess(false);
    
    // Simulate export process
    setTimeout(() => {
        setIsExporting(false);
        setExportSuccess(true);
        
        // Hide success state and close modal after a delay
        setTimeout(() => {
            setExportSuccess(false);
            setIsModalOpen(false);
        }, 2000);
    }, 2000);
  };

  const openPreview = (title: string) => {
    setSelectedReport(title);
    setIsPreviewOpen(true);
  };

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-[1920px] p-0 md:p-3 xl:p-5 min-h-[calc(100vh-88px)] bg-slate-50 dark:bg-[#050A19]">
        <main className="flex-1 rounded-2xl border border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126] min-h-[calc(100vh-120px)] shadow-sm dark:shadow-2xl relative flex flex-col overflow-hidden">
          
          {/* Reports Library Area */}
          <div className="flex-1 p-6 md:p-8 flex flex-col">
             
             {/* Header Section */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                   <button 
                     onClick={() => setIsModalOpen(true)}
                     className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm dark:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2 w-full md:w-auto hover:translate-y-[-1px] active:translate-y-[1px]"
                   >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                      تصدير تقرير مجمع
                   </button>
                   <button className="p-2.5 rounded-xl border border-slate-200 dark:border-[#1A2A4A] bg-slate-50 dark:bg-[#0A1126] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 transition-colors shrink-0 shadow-sm dark:shadow-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                   </button>
                </div>
                
                <div className="flex flex-col md:flex-row items-end md:items-center gap-4 w-full md:w-auto">
                   <div className="text-right">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">مكتبة التقارير</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">تحكم بجميع التقارير المصدرة والمجدولة</p>
                   </div>
                   <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 border border-blue-200 dark:border-blue-500/20">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                   </div>
                </div>
             </div>

             {/* Reports Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[
                  { title: "التقرير المالي السنوي 2023", icon: "📊", date: "منذ ساعتين", status: "تحميل جاهز", color: "blue" },
                  { title: "أداء مبيعات الربع الثالث", icon: "📈", date: "بالأمس", status: "مجدول", color: "emerald" },
                  { title: "تحليل تجربة العملاء (SPS)", icon: "🎯", date: "منذ 3 أيام", status: "مكتمل", color: "purple" },
                  { title: "تقرير المخزون اللوجستي", icon: "📦", date: "4 مارس 2024", status: "مؤرشف", color: "slate" }
                ].map((report, idx) => (
                  <div key={idx} className="group bg-slate-50 dark:bg-[#0D1632] border border-slate-200 dark:border-[#1A2A4A] rounded-2xl p-5 hover:border-blue-500/50 transition-all shadow-sm dark:shadow-none hover:shadow-lg">
                     <div className="flex justify-between items-start mb-4">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                        <div className={`w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 flex items-center justify-center text-xl`}>
                           {report.icon}
                        </div>
                     </div>
                     <h3 className="text-right text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-500 transition-colors">{report.title}</h3>
                     <p className="text-right text-[10px] text-slate-500 dark:text-slate-400 mb-4">{report.date}</p>
                     
                     <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-[#1A2A4A]">
                        <div className="flex items-center gap-1">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                           <span className="text-[10px] text-slate-500 dark:text-slate-400">{report.status}</span>
                        </div>
                        <div className="flex gap-2">
                           <button 
                             onClick={() => openPreview(report.title)}
                             className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#142247] border border-slate-200 dark:border-[#1A2A4A] text-[10px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1a2a4a] transition-colors"
                           >
                              معاينة
                           </button>
                           <button 
                             onClick={() => setIsModalOpen(true)}
                             className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-500 shadow-sm transition-colors"
                           >
                              تصدير
                           </button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>

             {/* Scheduling Card */}
             <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                   <div className="flex-1 text-center md:text-right">
                      <h3 className="text-2xl font-black mb-2 tracking-tight">أتمتة تقاريرك أصبحت أسهل</h3>
                      <p className="text-blue-100 text-sm max-w-lg ml-auto">قم بضبط مواعيد التصدير التلقائي وسنقوم بإرسال التقارير مباشرة إلى بريدك الإلكتروني أو فريق العمل في الموعد المحدد.</p>
                   </div>
                   <button 
                     onClick={() => {setIsModalOpen(true); setIsScheduled(true);}}
                     className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-3"
                   >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      جدولة تقرير الآن
                   </button>
                </div>
             </div>
          </div>
        </main>

        {/* MODALS */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsModalOpen(false)}
                 className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="relative w-full max-w-2xl bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] rounded-3xl shadow-2xl overflow-hidden"
               >
                  <div className="p-6 border-b border-slate-100 dark:border-[#1A2A4A] flex justify-between items-center">
                     <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                     </button>
                     <h2 className="text-xl font-black text-slate-900 dark:text-white">إعدادات التصدير</h2>
                  </div>

                  <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
                     <div>
                        <label className="block text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">صيغة الملف</label>
                        <div className="grid grid-cols-2 gap-4">
                           <button 
                             onClick={() => setSelectedFormat('PDF')}
                             className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${selectedFormat === 'PDF' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/10' : 'border-slate-100 dark:border-[#1A2A4A] hover:border-slate-200 dark:hover:border-blue-500/30'}`}
                           >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${selectedFormat === 'PDF' ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-[#142247] text-slate-400'}`}>
                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10h6M9 14h6" /></svg>
                              </div>
                              <span className={`font-bold ${selectedFormat === 'PDF' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>PDF Document</span>
                           </button>
                           <button 
                             onClick={() => setSelectedFormat('EXCEL')}
                             className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${selectedFormat === 'EXCEL' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10' : 'border-slate-100 dark:border-[#1A2A4A] hover:border-slate-200 dark:hover:border-emerald-500/30'}`}
                           >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${selectedFormat === 'EXCEL' ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-[#142247] text-slate-400'}`}>
                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              </div>
                              <span className={`font-bold ${selectedFormat === 'EXCEL' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>Excel Sheet</span>
                           </button>
                        </div>
                     </div>

                     <div className="pt-4 border-t border-slate-100 dark:border-[#1A2A4A]">
                        <div className="flex justify-between items-center mb-6">
                           <button 
                             onClick={() => setIsScheduled(!isScheduled)}
                             className={`w-12 h-6 rounded-full relative transition-colors ${isScheduled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                           >
                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isScheduled ? 'right-7' : 'right-1'}`} />
                           </button>
                           <span className="text-sm font-bold text-slate-900 dark:text-white">تفعيل الجدولة التلقائية</span>
                        </div>
                        
                        {isScheduled && (
                           <motion.div 
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: 'auto', opacity: 1 }}
                             className="space-y-4"
                           >
                              <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <label className="block text-right text-[10px] font-bold text-slate-400 mb-2">الوقت</label>
                                    <input type="time" className="w-full bg-slate-50 dark:bg-[#0D1632] border border-slate-100 dark:border-[#1A2A4A] rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500" defaultValue="08:00" />
                                 </div>
                                 <div>
                                    <label className="block text-right text-[10px] font-bold text-slate-400 mb-2">التكرار</label>
                                    <select className="w-full bg-slate-50 dark:bg-[#0D1632] border border-slate-100 dark:border-[#1A2A4A] rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 text-right">
                                       <option>يومياً</option>
                                       <option>أسبوعياً</option>
                                       <option>شهرياً</option>
                                    </select>
                                 </div>
                              </div>
                              <div>
                                 <label className="block text-right text-[10px] font-bold text-slate-400 mb-2">البريد الإلكتروني للمستلم</label>
                                 <input type="email" placeholder="example@company.com" className="w-full bg-slate-50 dark:bg-[#0D1632] border border-slate-100 dark:border-[#1A2A4A] rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 text-right" />
                              </div>
                           </motion.div>
                        )}
                     </div>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-[#0D1632] border-t border-slate-100 dark:border-[#1A2A4A] flex justify-between gap-4">
                     <button 
                       onClick={() => setIsModalOpen(false)}
                       className="flex-1 px-6 py-3.5 rounded-2xl font-bold text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                     >
                        إلغاء
                     </button>
                     <button 
                       onClick={handleExport}
                       disabled={isExporting || exportSuccess}
                       className={`flex-1 px-8 py-3.5 rounded-2xl font-bold text-sm text-white shadow-xl transition-all flex items-center justify-center gap-3 disabled:cursor-not-allowed ${exportSuccess ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'}`}
                     >
                        {isExporting ? (
                           <>
                              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              جاري التحضير...
                           </>
                        ) : exportSuccess ? (
                           <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                              تم التصدير بنجاح
                           </>
                        ) : (
                           'بدء التصدير الآن'
                        )}
                     </button>
                  </div>
               </motion.div>
            </div>
          )}

          {isPreviewOpen && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsPreviewOpen(false)}
                 className="absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-md"
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="relative w-full max-w-5xl h-[85vh] bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
               >
                  <div className="p-4 border-b border-slate-100 dark:border-[#1A2A4A] flex justify-between items-center bg-slate-50 dark:bg-[#0D1632]">
                     <div className="flex gap-2">
                        <button onClick={() => setIsPreviewOpen(false)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-[#1A2A4A] text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 transition-colors">إغلاق</button>
                        <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors">طباعة</button>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{selectedReport}</span>
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-12 bg-slate-100 dark:bg-[#050A19]">
                     {/* Mock Document Page */}
                     <div className="max-w-4xl mx-auto bg-white dark:bg-[#0D1632] shadow-2xl min-h-[1000px] p-16 rounded-sm text-right">
                        <div className="flex justify-between items-start border-b-2 border-slate-100 dark:border-[#1A2A4A] pb-8 mb-12">
                           <div className="text-left">
                              <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">ENTITY BOARD</p>
                              <p className="text-[10px] text-slate-500">Intelligence & Analytics</p>
                           </div>
                           <div className="text-right">
                              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{selectedReport}</h1>
                              <p className="text-sm text-slate-500">تاريخ الإصدار: {new Date().toLocaleDateString('ar-SA')}</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-12">
                           {[
                              { label: 'إجمالي المبيعات', val: '٤٥٠,٠٠٠ ر.س', up: true },
                              { label: 'متوسط قيمة الطلب', val: '١,٢٥٠ ر.س', up: true },
                              { label: 'معدل الارتداد', val: '١٢٪', up: false }
                           ].map((s, i) => (
                              <div key={i} className="bg-slate-50 dark:bg-[#142247] p-4 rounded-xl border border-slate-100 dark:border-[#1A2A4A]">
                                 <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">{s.label}</p>
                                 <p className="text-lg font-black text-slate-900 dark:text-white">{s.val}</p>
                              </div>
                           ))}
                        </div>

                        <div className="space-y-8">
                           <div className="h-64 bg-slate-50 dark:bg-[#142247] rounded-2xl border border-slate-100 dark:border-[#1A2A4A] flex items-center justify-center relative overflow-hidden">
                              <p className="text-slate-400 text-sm font-bold z-10">مخطط بياني تحليلي - أداء القنوات التسويقية</p>
                              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 200">
                                 <path d="M0,150 Q50,50 100,100 T200,80 T300,120 T400,50 L400,200 L0,200 Z" fill="#3B82F6" />
                              </svg>
                           </div>
                           
                           <div className="space-y-4">
                              <h4 className="text-sm font-bold text-slate-900 dark:text-white border-r-4 border-blue-500 pr-3">موجز النتائج الرئيسية</h4>
                              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                 "أظهرت البيانات نمواً ملحوظاً في قطاع التجزئة بنسبة ١٥٪ مقارنة بالربع السابق، مع تحسن طفيف في معدلات الاحتفاظ بالعملاء. نوصي بزيادة الإنفاق على حملات إعادة الاستهداف لتحسين مؤشرات الارتداد..."
                              </p>
                           </div>

                           <div className="border border-slate-100 dark:border-[#1A2A4A] rounded-xl overflow-hidden">
                              <table className="w-full text-[10px] text-right">
                                 <thead className="bg-slate-50 dark:bg-[#142247] text-slate-600 dark:text-slate-300">
                                    <tr>
                                       <th className="p-3">النمو</th>
                                       <th className="p-3">الإيرادات</th>
                                       <th className="p-3">الفئة</th>
                                    </tr>
                                 </thead>
                                 <tbody className="text-slate-700 dark:text-slate-400">
                                    <tr className="border-t border-slate-50 dark:border-[#1A2A4A]"><td className="p-3 text-emerald-500">+٢٢٪</td><td className="p-3">١٢٠,٠٠٠ ر.س</td><td className="p-3 font-bold">الأجهزة الإلكترونية</td></tr>
                                    <tr className="border-t border-slate-50 dark:border-[#1A2A4A]"><td className="p-3 text-emerald-500">+١٥٪</td><td className="p-3">٩٥,٠٠٠ ر.س</td><td className="p-3 font-bold">الموضة والجمال</td></tr>
                                    <tr className="border-t border-slate-50 dark:border-[#1A2A4A]"><td className="p-3 text-rose-500">-٤٪</td><td className="p-3">٤٥,٠٠٠ ر.س</td><td className="p-3 font-bold">الأثاث المنزلي</td></tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>

                        <div className="mt-20 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100 dark:border-[#1A2A4A] pt-4">
                           <p>رقم الصفحة: ١ من ١</p>
                           <p>ENTITY BOARD © 2024</p>
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
