'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function HelpCenterPage() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    { title: 'بدء الاستخدام', icon: 'auto_awesome', count: '12 مقال' },
    { title: 'إدارة الفريق', icon: 'people', count: '8 مقالات' },
    { title: 'الفواتير والأمان', icon: 'verified_user', count: '5 مقالات' },
    { title: 'تخصيص اللوحات', icon: 'dashboard_customize', count: '15 مقال' },
  ];

  const faqs = [
    { q: 'كيف يمكنني ترقية خطة اشتراكي؟', a: 'يمكنك الترقية بسهولة من خلال قسم "الاشتراكات والفواتير" في السايدبار، واختيار الخطة التي تناسب احتياجاتك.' },
    { q: 'هل يمكنني استعادة البيانات المحذوفة؟', a: 'يحتفظ النظام بنسخة احتياطية لمدة 30 يوماً. يمكنك التواصل مع الدعم الفني لاستعادة البيانات خلال هذه الفترة.' },
    { q: 'كيف يتم احتساب استهلاك الـ API؟', a: 'يتم احتساب كل طلب ناجح (Status 200) كطلب واحد. الطلبات الفاشلة لا تحسب ضمن الحد المسموح.' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Search Section */}
      <div className="relative p-12 lg:p-20 rounded-[48px] bg-slate-900 dark:bg-[#0A1126] border border-white/5 shadow-2xl overflow-hidden text-center flex flex-col items-center">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent)]" />
         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 max-w-2xl w-full">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-6">كيف يمكننا مساعدتك اليوم؟</h1>
            <p className="text-slate-400 font-medium mb-10 text-lg">ابحث في قاعدة المعرفة عن حلول سريعة أو تواصل مع خبرائنا.</p>
            
            <div className="relative group w-full">
               <input 
                 type="text"
                 placeholder="ابحث عن دروس، مقالات، أو حلول..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full h-16 rounded-[24px] bg-white/5 border border-white/10 px-14 font-bold text-white outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-right"
               />
               <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-hover:text-blue-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
         </motion.div>
      </div>

      {/* Help Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {helpCategories.map((cat, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="p-8 rounded-[40px] bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-white/10 shadow-sm text-center group hover:border-blue-500/30 transition-all cursor-pointer"
           >
              <div className="w-16 h-16 rounded-[24px] bg-blue-500/10 text-blue-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                 <span className="material-icons-outlined text-3xl">{cat.icon}</span>
              </div>
              <h3 className="font-black text-slate-900 dark:text-white mb-2">{cat.title}</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.count}</p>
           </motion.div>
         ))}
      </div>

      {/* Main Content Area: FAQs & Support */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         
         {/* FAQs */}
         <div className="lg:col-span-8 p-10 rounded-[48px] bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-white/10 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-10 text-right">الأسئلة الأكثر شيوعاً</h2>
            <div className="space-y-6">
               {faqs.map((faq, i) => (
                 <div key={i} className="group p-6 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 hover:border-blue-500/20 transition cursor-pointer">
                    <div className="flex items-center justify-between gap-4 mb-4">
                       <h4 className="font-black text-slate-800 dark:text-slate-100 text-right">{faq.q}</h4>
                       <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                       </svg>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed text-right">{faq.a}</p>
                 </div>
               ))}
            </div>
         </div>

         {/* Support CTA */}
         <div className="lg:col-span-4 p-10 rounded-[48px] bg-blue-600 shadow-2xl shadow-blue-500/40 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full" />
            <div className="relative z-10">
               <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
               </div>
               <h3 className="text-2xl font-black text-white mb-3">هل مازلت تحتاج لمساعدة؟</h3>
               <p className="text-blue-100 font-medium text-sm leading-relaxed mb-8">فريق الدعم الفني لدينا متاح لمساعدتك في أي وقت على مدار الساعة.</p>
               <button 
                onClick={() => showToast('جاري فتح محادثة مباشرة مع الدعم')}
                className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black shadow-xl hover:bg-slate-50 transition active:scale-95"
               >
                  تحدث مع خبير الآن
               </button>
               <button className="mt-4 text-xs font-black text-blue-100/70 hover:text-white transition">أو أرسل تذكرة دعم بريدية</button>
            </div>
         </div>
      </div>
    </div>
  );
}
