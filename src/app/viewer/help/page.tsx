'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ViewerHelp() {
  const [showToast, setShowToast] = useState(false);

  const handleContactSupport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">مركز المساعدة</h1>
        <p className="text-slate-500 dark:text-slate-400">كيف يمكننا مساعدتك اليوم؟ استعرض الأسئلة الشائعة أو تواصل معنا.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">الأسئلة الشائعة</h2>
          {[
            { q: 'كيف يمكنني تصدير البيانات؟', a: 'يمكنك تصدير البيانات من خلال الضغط على زر "تصدير" الموجود في أعلى كل لوحة بيانات.' },
            { q: 'هل يمكنني تعديل اللوحات؟', a: 'بصفتك مشاهداً، لا يمكنك تعديل اللوحات، ولكن يمكنك التفاعل مع الفلاتر لمشاهدة البيانات التي تهمك.' },
            { q: 'من يملك صلاحية مشاركة اللوحات؟', a: 'صاحب العمل (Owner) هو المسؤول الوحيد عن منح صلاحيات الوصول والتحكم.' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-[#1A2A4A] rounded-2xl p-6 shadow-sm">
              <p className="font-bold text-slate-900 dark:text-white mb-2">{item.q}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
           <div className="relative z-10">
              <h2 className="text-2xl font-black mb-4">هل تحتاج مساعدة إضافية؟</h2>
              <p className="text-blue-100 mb-8 max-w-xs font-semibold">تواصل مع فريق الدعم الفني الخاص بشركة كيان بورد لحل أي مشاكل تقنية تواجهك.</p>
              <button 
                onClick={handleContactSupport}
                className="px-6 py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition shadow-xl"
              >
                 تحدث مع الدعم
              </button>
           </div>
           
           <svg className="absolute bottom-0 left-0 w-64 h-64 text-blue-500/20 translate-y-12 -translate-x-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.892.527 3.66 1.438 5.163L2 22l4.837-1.438A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.971 7.971 0 01-4.102-1.127l-.295-.175-2.887.859.859-2.887-.175-.295A7.975 7.975 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
           </svg>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 transition-all"
            dir="rtl"
          >
             <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
             </div>
             <p className="font-bold text-sm">جاري فتح المحادثة مع الدعم الفني...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
