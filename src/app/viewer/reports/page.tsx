'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ViewerReports() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string>('');

  const reports = [
    { title: 'تقرير مبيعات شهر مارس', date: '2024-03-20', type: 'PDF' },
    { title: 'تحليل الربع الأول 2024', date: '2024-03-15', type: 'Excel' },
    { title: 'تقرير نمو المستخدمين', date: '2024-03-10', type: 'PDF' },
  ];

  const openPreview = (title: string) => {
    setSelectedReport(title);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">التقارير المتاحة</h1>
        <p className="text-slate-500 dark:text-slate-400">استعرض وقم بتحميل التقارير التي تمت مشاركتها معك.</p>
      </div>

      <div className="bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right" dir="rtl">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-[#1A2A4A]">
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">اسم التقرير</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">تاريخ الإصدار</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">النوع</th>
                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {reports.map((report, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{report.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{report.date}</td>
                  <td className="px-6 py-4 text-xs">
                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-white/5 font-bold text-slate-600 dark:text-slate-300">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => openPreview(report.title)}
                      className="text-blue-500 hover:text-blue-600 text-sm font-bold"
                    >
                      عرض التقرير
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
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
                <div className="p-4 border-b border-slate-100 dark:border-[#1A2A4A] flex justify-between items-center bg-slate-50 dark:bg-[#0D1632]" dir="ltr">
                   <div className="flex gap-2">
                      <button onClick={() => setIsPreviewOpen(false)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-[#1A2A4A] text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 transition-colors">Close</button>
                      <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors">Download PDF</button>
                   </div>
                   <div className="flex items-center gap-3" dir="rtl">
                      <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tighter">{selectedReport}</span>
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </div>
                   </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-12 bg-slate-100 dark:bg-[#050A19]">
                   <div className="max-w-4xl mx-auto bg-white dark:bg-[#0D1632] shadow-2xl min-h-[1000px] p-16 rounded-sm text-right" dir="rtl">
                      <div className="flex justify-between items-start border-b-2 border-slate-100 dark:border-[#1A2A4A] pb-8 mb-12">
                         <div className="text-left" dir="ltr">
                            <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">ENTITY BOARD</p>
                            <p className="text-[10px] text-slate-500 uppercase">Intelligence & Analytics</p>
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
