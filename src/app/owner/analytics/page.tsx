'use client';

import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/Toast';
import { Counter } from '@/components/ui/Counter';

export default function AnalyticsPage() {
  const { showToast } = useToast();

  const metrics = [
    { label: 'معدل الارتداد', value: 32.4, trend: '-4.2%', trendUp: false, color: 'blue', suffix: '%' },
    { label: 'متوسط وقت الجلسة', value: 4.2, trend: '+12%', trendUp: true, color: 'purple', suffix: 'm' },
    { label: 'معدل التحويل', value: 3.8, trend: '+0.5%', trendUp: true, color: 'emerald', suffix: '%' },
    { label: 'المستخدمون النشطون', value: 12.4, trend: '+8.1%', trendUp: true, color: 'amber', suffix: 'k' },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">التحليلات المتقدمة</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">نظرة عميقة على سلوك المستخدمين وأداء المنصة الذكي.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-5 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-xl font-bold text-sm hover:bg-slate-50 transition">تصدير بيانات</button>
           <div className="px-4 py-2.5 bg-blue-600 text-white rounded-xl font-black text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              تحليل بالذكاء الاصطناعي
           </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {metrics.map((m, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="p-6 rounded-[32px] bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-white/10 shadow-sm"
           >
              <div className="flex items-center justify-between mb-4">
                 <div className={`p-2 rounded-xl bg-${m.color}-500/10 text-${m.color}-500`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                 </div>
                 <span className={`text-xs font-black px-2 py-1 rounded-lg ${m.trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {m.trend}
                 </span>
              </div>
              <p className="text-xs font-bold text-slate-500 mb-1">{m.label}</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                 <Counter value={m.value} suffix={m.suffix} decimals={1} />
              </h3>
           </motion.div>
         ))}
      </div>

      {/* Main Charts Mockup Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* User Growth Chart */}
         <div className="lg:col-span-8 p-8 rounded-[40px] bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-white/10 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-lg font-black text-slate-900 dark:text-white">نمو المستخدمين (آخر 30 يوم)</h3>
               <select className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none">
                  <option>أسبوعي</option>
                  <option>شهري</option>
               </select>
            </div>
            
            <div className="h-64 flex items-end gap-2 px-4 relative">
               {/* Simplified area chart mockup */}
               <svg className="absolute inset-0 w-full h-full px-4" preserveAspectRatio="none">
                  <path d="M0,200 L50,150 L100,180 L150,100 L200,130 L250,80 L300,90 L350,40 L400,60" fill="none" stroke="#2563EB" strokeWidth="3" className="opacity-50" />
                  <path d="M0,200 L50,150 L100,180 L150,100 L200,130 L250,80 L300,90 L350,40 L400,60 L400,256 L0,256 Z" fill="url(#blue-grad)" className="opacity-20" />
                  <defs>
                     <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="transparent" />
                     </linearGradient>
                  </defs>
               </svg>
               {/* Vertical grid lines markers */}
               {Array.from({length: 10}).map((_, i) => (
                 <div key={i} className="flex-1 h-full border-r border-slate-100 dark:border-white/5" />
               ))}
            </div>
            <div className="flex justify-between mt-6 px-4 text-[10px] font-bold text-slate-400">
               {['يوم 1', 'يوم 5', 'يوم 10', 'يوم 15', 'يوم 20', 'يوم 25', 'يوم 30'].map(d => <span key={d}>{d}</span>)}
            </div>
         </div>

         {/* Conversion Funnel */}
         <div className="lg:col-span-4 p-8 rounded-[40px] bg-[#0F172A] border border-white/5 shadow-2xl flex flex-col justify-between">
            <h3 className="text-lg font-black text-white mb-10">قمع التحويل (Conversion Funnel)</h3>
            
            <div className="space-y-6">
               {[
                 { label: 'الزيارات', val: '100%', w: '100%', color: 'blue' },
                 { label: 'التسجيل', val: '45.2%', w: '65%', color: 'purple' },
                 { label: 'التفعيل', val: '12.8%', w: '40%', color: 'emerald' },
                 { label: 'الدفع', val: '3.8%', w: '25%', color: 'amber' }
               ].map((item, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between text-xs font-black">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="text-white">{item.val}</span>
                     </div>
                     <div className="h-4 w-full bg-white/5 rounded-2xl overflow-hidden p-1">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: item.w }}
                          transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                          className={`h-full rounded-xl bg-${item.color}-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]`} 
                        />
                     </div>
                  </div>
               ))}
            </div>

            <p className="mt-8 text-[10px] text-slate-500 font-bold leading-relaxed text-center">يتم تحديث بيانات القمع بشكل لحظي بناءً على نشاطات المستخدمين.</p>
         </div>
      </div>

      {/* Insights Section */}
      <div className="p-10 rounded-[48px] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 shadow-inner">
         <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">رؤى الأداء الذكية</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0A1126] border border-slate-100 dark:border-white/5 shadow-sm">
               <h4 className="font-black text-blue-600 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  فرصة نمو مكتشفة
               </h4>
               <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                  هناك زيادة بنسبة 20% في تفاعل المستخدمين خلال عطلات نهاية الأسبوع. ننصح بجدولة حملات ترويجية في هذا الوقت لزيادة معدل التحويل.
               </p>
            </div>
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0A1126] border border-slate-100 dark:border-white/5 shadow-sm">
               <h4 className="font-black text-amber-600 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  تنبيه معدل الارتداد
               </h4>
               <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                  تم اكتشاف ارتفاع في معدل الارتداد على صفحة "الدفع المسبق". قد يكون هناك عائق تقني أو تجربة مستخدم تحتاج لتحسين.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
