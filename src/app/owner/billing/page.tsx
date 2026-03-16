'use client';

import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/Toast';
import { Counter } from '@/components/ui/Counter';

export default function BillingPage() {
  const { showToast } = useToast();

  const invoices = [
    { id: '#INV-2023-009', date: '15 سبتمبر 2023', amount: '199.00 ر.س', status: 'مدفوعة', color: 'emerald' },
    { id: '#INV-2023-008', date: '15 أغسطس 2023', amount: '199.00 ر.س', status: 'مدفوعة', color: 'emerald' },
    { id: '#INV-2023-007', date: '15 يوليو 2023', amount: '199.00 ر.س', status: 'فشلت', color: 'rose' },
  ];

  return (
    <div className="space-y-10 pb-10">
      {/* Header & Hero-style Billing Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Resource Consumption Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 p-8 rounded-[40px] bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-white/10 shadow-sm"
        >
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center justify-between">
             استهلاك الموارد
             <span className="text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
             </span>
          </h2>

          <div className="space-y-8">
             <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-slate-500">لوحات القيادة</span>
                   <span className="text-slate-900 dark:text-white">
                      <Counter value={12} /> / 15
                   </span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: '80%' }}
                     transition={{ duration: 1, delay: 0.2 }}
                     className="h-full bg-blue-600 rounded-full" 
                   />
                </div>
             </div>

             <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold">
                   <span className="text-slate-500">طلبات API</span>
                   <span className="text-slate-900 dark:text-white">
                      <Counter value={40000} /> / 50,000
                   </span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: '80%' }}
                     transition={{ duration: 1, delay: 0.4 }}
                     className="h-full bg-amber-500 rounded-full" 
                   />
                </div>
             </div>

             <p className="text-xs font-bold text-amber-600 dark:text-amber-500 flex items-center gap-2 pt-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                وصلت إلى 80% من الحد المسموح
             </p>
          </div>
        </motion.div>

        {/* Current Plan Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 p-10 rounded-[40px] bg-slate-900 dark:bg-[#0A1126] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between"
        >
           <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
           
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2 block">الخطة النشطة</span>
                    <h2 className="text-3xl font-black text-white mb-4">الخطة الاحترافية (Pro)</h2>
                    <p className="text-slate-400 font-medium max-w-md leading-relaxed">أنت تستفيد من كافة أدوات التحليل المتقدمة، الربط البرمجي غير المحدود، وتقارير الذكاء الاصطناعي اليومية.</p>
                 </div>
                 <div className="text-left">
                    <p className="text-[10px] font-black text-slate-500 mb-1">التكلفة الشهرية</p>
                    <p className="text-3xl font-black text-white">
                       <Counter value={199} /> <span className="text-sm">ر.س</span>
                    </p>
                 </div>
              </div>
           </div>

           <div className="relative z-10 flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-white/5">
              <div className="flex gap-4">
                 <button className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition shadow-xl shadow-blue-600/20 active:scale-95">
                    ترقية الاشتراك
                 </button>
                 <button 
                  onClick={() => showToast('طلب إلغاء الخطة قيد المعالجة')}
                  className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black transition active:scale-95"
                 >
                    إلغاء الخطة
                 </button>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
                 تاريخ التجديد: <span className="text-white">15 أكتوبر 2023</span>
              </div>
           </div>
        </motion.div>
      </div>

      {/* Invoices Table Section */}
      <div className="bg-white dark:bg-[#0A1126] rounded-[40px] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
           <h2 className="text-2xl font-black text-slate-900 dark:text-white">سجل الفواتير</h2>
           <button className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:underline">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              تحميل الكل
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/[0.02] text-xs font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-5">رقم الفاتورة</th>
                <th className="px-8 py-5">تاريخ الصدور</th>
                <th className="px-8 py-5">المبلغ</th>
                <th className="px-8 py-5 text-center">الحالة</th>
                <th className="px-8 py-5 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {invoices.map((invoice, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                  <td className="px-8 py-6 font-bold text-slate-900 dark:text-white">{invoice.id}</td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-500">{invoice.date}</td>
                  <td className="px-8 py-6 font-black text-slate-900 dark:text-white">{invoice.amount}</td>
                  <td className="px-8 py-6 text-center">
                     <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black bg-${invoice.color}-500/10 text-${invoice.color}-500 border border-${invoice.color}-500/20`}>
                        <span className={`w-1.5 h-1.5 rounded-full bg-${invoice.color}-500`} />
                        {invoice.status}
                     </span>
                  </td>
                  <td className="px-8 py-6 text-left">
                     <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-500 hover:text-blue-600 transition shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-1 relative isolate overflow-hidden rounded-[40px] bg-blue-600"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_50%_-10rem,#1e40af,transparent)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-blue-600 -z-20" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12 items-center">
           <div className="space-y-8">
              <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">هل تحتاج لمزيد من القوة؟</h3>
              <p className="text-blue-100 text-lg font-medium leading-relaxed max-w-xl">
                 انتقل إلى "خطة المؤسسات" للحصول على ميزات حصرية تشمل الدعم المخصص، الربط مع SAP و Oracle، وتخزين بيانات غير محدود.
              </p>
              <div className="space-y-4">
                 {[
                   'مستخدمين ومديري مساحات عمل غير محدودين',
                   'تخزين سحابي آمن بسعة 1 تيرابايت',
                   'مدير حساب تقني مخصص متوفر 24/7'
                 ].map((feature, i) => (
                   <div key={i} className="flex items-center gap-4 text-white font-bold">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center border border-white/20">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                         </svg>
                      </div>
                      {feature}
                   </div>
                 ))}
              </div>
           </div>

           <div className="relative group">
              <div className="absolute -inset-4 bg-white/10 rounded-[48px] blur-3xl group-hover:bg-white/20 transition-all duration-1000" />
              <div className="relative p-10 rounded-[40px] bg-white text-slate-900 shadow-2xl overflow-hidden text-center lg:text-right">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-b-2xl">
                    الأفضل للشركات الكبرى
                 </div>
                 <h4 className="text-2xl font-black mb-2 mt-4">خطة المؤسسات</h4>
                 <div className="flex items-end justify-center lg:justify-end gap-2 mb-8">
                    <span className="text-5xl font-black">499</span>
                    <span className="text-sm font-bold text-slate-500 mb-1.5">ر.س / شهرياً</span>
                 </div>
                 <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition shadow-xl shadow-blue-500/20 active:scale-95">
                    ابدأ الفترة التجريبية الآن
                 </button>
                 <p className="mt-4 text-[10px] text-slate-400 font-bold text-center">تطبق الشروط والأحكام الخاصة بخدمة المؤسسات</p>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
