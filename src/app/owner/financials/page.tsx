'use client';

import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/Toast';
import { Counter } from '@/components/ui/Counter';

export default function FinancialsPage() {
  const { showToast } = useToast();

  const financialStats = [
    { label: 'إجمالي الإيرادات', value: 45280, trend: '+15.2%', trendUp: true, color: 'emerald', suffix: ' ر.س' },
    { label: 'صافي الربح', value: 32150, trend: '+8.4%', trendUp: true, color: 'blue', suffix: ' ر.س' },
    { label: 'إجمالي المصاريف', value: 13130, trend: '+2.1%', trendUp: false, color: 'rose', suffix: ' ر.س' },
    { label: 'العائد على الاستثمار', value: 240, trend: '+45%', trendUp: true, color: 'amber', suffix: '%' },
  ];

  const transactions = [
    { id: '#TRX-9901', date: 'منذ ساعة', category: 'اشتراك شهري', amount: '+499.00 ر.س', type: 'in' },
    { id: '#TRX-9902', date: 'منذ ساعتين', category: 'خدمة سحابية', amount: '-120.00 ر.س', type: 'out' },
    { id: '#TRX-9903', date: 'منذ 5 ساعات', category: 'اشتراك Pro', amount: '+199.00 ر.س', type: 'in' },
    { id: '#TRX-9904', date: 'أمس', category: 'دعم تقني', amount: '-50.00 ر.س', type: 'out' },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">التقارير المالية</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">متابعة التدفقات النقدية، الأرباح، والمصاريف التشغيلية لمؤسستك.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-500/20 active:scale-95">تحميل التقرير الضريبي</button>
           <button className="px-5 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-xl font-bold text-sm hover:bg-slate-50 transition">الفترة المالية</button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {financialStats.map((stat, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="p-8 rounded-[40px] bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden group"
           >
              <div className={`absolute top-0 right-0 w-2 h-full bg-${stat.color}-500 group-hover:w-3 transition-all`} />
              <p className="text-xs font-bold text-slate-500 mb-2">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                 <Counter value={stat.value} suffix={stat.suffix} />
              </h3>
              <div className="flex items-center gap-2">
                 <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${stat.trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {stat.trend}
                 </span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">مقارنة بالشهر الماضي</span>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Monthly Revenue Chart Mockup */}
         <div className="lg:col-span-7 bg-white dark:bg-[#0A1126] rounded-[48px] border border-slate-200 dark:border-white/10 p-10 shadow-sm">
            <div className="flex items-center justify-between mb-12">
               <h3 className="text-xl font-black text-slate-900 dark:text-white">نمو الإيرادات الشهري</h3>
               <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-blue-600" />
                     <span className="text-[10px] font-bold text-slate-400">الإيرادات</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-rose-500" />
                     <span className="text-[10px] font-bold text-slate-400">المصاريف</span>
                  </div>
               </div>
            </div>

            <div className="flex items-end justify-between h-56 gap-4">
               {[
                 { r: 40, e: 20 }, { r: 60, e: 15 }, { r: 55, e: 30 }, { r: 85, e: 25 }, { r: 70, e: 20 }, { r: 95, e: 35 }
               ].map((d, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full">
                    <div className="w-full flex-1 flex flex-col justify-end gap-1">
                       <motion.div initial={{ height: 0 }} animate={{ height: `${d.r}%` }} className="w-full bg-blue-600 rounded-lg shadow-lg shadow-blue-500/10" />
                       <motion.div initial={{ height: 0 }} animate={{ height: `${d.e}%` }} className="w-full bg-rose-500/30 rounded-lg" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase">شهر {i+1}</span>
                 </div>
               ))}
            </div>
         </div>

         {/* Recent Transactions List */}
         <div className="lg:col-span-5 bg-[#0F172A] rounded-[48px] p-10 shadow-2xl border border-white/5">
            <h3 className="text-xl font-black text-white mb-10">العمليات الأخيرة</h3>
            <div className="space-y-8">
               {transactions.map((trx, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.2 + (i * 0.1) }}
                   className="flex items-center justify-between p-4 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 transition group"
                 >
                    <div className="flex items-center gap-4 text-right">
                       <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${trx.type === 'in' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>
                          {trx.type === 'in' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                          )}
                       </div>
                       <div>
                          <p className="text-sm font-black text-white">{trx.category}</p>
                          <p className="text-[10px] font-bold text-slate-500">{trx.date} • {trx.id}</p>
                       </div>
                    </div>
                    <span className={`text-sm font-black ${trx.type === 'in' ? 'text-emerald-500' : 'text-rose-400 underline decoration-rose-500/30 underline-offset-4'}`}>
                       {trx.amount}
                    </span>
                 </motion.div>
               ))}
            </div>
            <button className="w-full py-4 mt-8 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-xs border border-white/5 transition">عرض كافة العمليات</button>
         </div>
      </div>

      {/* Financial Wisdom Banner */}
      <div className="bg-slate-900 dark:bg-blue-600 rounded-[40px] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full" />
         <div className="relative z-10 text-right">
            <h3 className="text-2xl font-black text-white mb-4">هل تعلم؟</h3>
            <p className="text-blue-100 font-medium max-w-lg leading-relaxed">بناءً على تحليلاتنا المالية، يمكنك خفض المصاريف التشغيلية بنسبة 8% من خلال تفعيل خيار "الدفع السنوي" وتجميع مساحات العمل الخامدة.</p>
         </div>
         <button className="relative z-10 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-slate-100 transition whitespace-nowrap active:scale-95">عرض تحليل تقليل التكاليف</button>
      </div>
    </div>
  );
}
