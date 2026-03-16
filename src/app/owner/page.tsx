'use client';

import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/Toast';
import { Counter } from '@/components/ui/Counter';

export default function OwnerDashboard() {
  const { showToast } = useToast();

  const stats = [
    {
      label: 'مساحات العمل',
      value: 12,
      trend: '+12%',
      trendUp: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'blue'
    },
    {
      label: 'الفريق النشط',
      value: 45,
      trend: '+5%',
      trendUp: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0v.183A8.884 8.884 0 0117 20zm-5-1a6 6 0 0112 0v1H2v-1z" />
        </svg>
      ),
      color: 'emerald'
    },
    {
      label: 'لوحات البيانات',
      value: 128,
      trend: '-2%',
      trendUp: false,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'purple'
    },
    {
      label: 'استهلاك API',
      value: 78,
      suffix: '%',
      status: 'مثالي',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'amber'
    }
  ];

  const activities = [
    { user: 'سارة خالد', action: 'قامت بإضافة 4 أعضاء جدد لمساحة عمل "التسويق"', time: 'منذ دقيقتين', color: 'blue' },
    { user: 'نظام الأتمتة', action: 'تم إصدار الفاتورة الشهرية بنجاح', time: 'منذ ساعة', color: 'emerald' },
    { user: 'محمد علي', action: 'قام بتعديل صلاحيات "مدير المشروع"', time: 'منذ 3 ساعات', color: 'slate' },
    { user: 'يوسف إبراهيم', action: 'أنشأ لوحة بيانات جديدة "مبيعات الربع الثالث"', time: 'منذ 5 ساعات', color: 'purple' }
  ];

  return (
    <div className="space-y-10 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3"
          >
            أهلاً بك يا أحمد، أداء شركتك ممتاز اليوم...
          </motion.h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">نظرة عامة على أداء نظامك ومساحات العمل الخاصة بك.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition">
            تقارير متكاملة
          </button>
          <button className="px-5 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/10 transition">
            تحديث البيانات
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-[32px] bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
                 {stat.icon}
              </div>
              {stat.trend && (
                <span className={`text-xs font-black px-2 py-1 rounded-lg ${stat.trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                  {stat.trend}
                </span>
              )}
              {stat.status && (
                <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {stat.status}
                </span>
              )}
            </div>
            <div>
               <p className="text-sm font-bold text-slate-500 mb-1">{stat.label}</p>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                  <Counter value={stat.value as number} suffix={('suffix' in stat ? stat.suffix : '') as string} />
               </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: AI Insights & Chart */}
        <div className="lg:col-span-8 space-y-8">
          <div className="p-8 rounded-[40px] bg-white dark:bg-[#0A1126] border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-3">
               مركز الرؤى الذكية 
               <span className="text-blue-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
               </span>
            </h2>

            <div className="space-y-6">
               <div className="group p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition">
                  <div className="flex items-center justify-between mb-4">
                     <h4 className="font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 text-lg">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        تحسين الإنتاجية
                     </h4>
                     <span className="text-[10px] font-black px-2 py-1 bg-blue-500/10 text-blue-600 rounded-md">تحليل ذكي</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                     لقد لوحظ زيادة بنسبة 14% في وتيرة تسليم المهام في فريق "التطوير" خلال الأسبوع الماضي. ننصح بمكافأة الفريق.
                  </p>
               </div>

               <div className="group p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 hover:bg-amber-500/10 transition">
                  <div className="flex items-center justify-between mb-4">
                     <h4 className="font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 text-lg">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        تنبيه استهلاك الموارد
                     </h4>
                     <span className="text-[10px] font-black px-2 py-1 bg-amber-500/10 text-amber-600 rounded-md">تحذير</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                     خطة الـ API الخاصة بك وصلت إلى 80% من سعتها. قد ترغب في الترقية الآن لتجنب انقطاع الخدمة.
                  </p>
               </div>
            </div>

            {/* Chart Area */}
            <div className="mt-12 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[32px] p-8">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black text-slate-900 dark:text-white">معدل نشاط الفريق الأسبوعي</h3>
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-blue-600" />
                     <div className="w-3 h-3 rounded-full bg-blue-600/30" />
                  </div>
               </div>
               <div className="flex items-end gap-3 h-48 px-4">
                  {[40, 70, 45, 90, 65, 80, 55, 60, 40].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + (i * 0.05), duration: 1 }}
                      className={`flex-1 rounded-t-xl ${i % 3 === 0 ? 'bg-blue-600' : 'bg-blue-600/20'}`}
                    />
                  ))}
               </div>
               <div className="grid grid-cols-9 mt-4 px-4 text-center">
                  {['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح', 'ن'].map((d, i) => (
                    <span key={i} className="text-[10px] font-bold text-slate-400">{d}</span>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Right: Recent Activity Sidebar */}
        <div className="lg:col-span-4">
          <div className="p-8 rounded-[40px] bg-[#0F172A] border border-white/5 shadow-2xl overflow-hidden relative">
            <h2 className="text-2xl font-black text-white mb-10">آخر النشاطات</h2>
            
            <div className="space-y-10 relative">
               {/* Vertical Line */}
               <div className="absolute top-2 right-[11px] w-[2px] h-[calc(100%-40px)] bg-white/5" />

               {activities.map((activity, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.2 + (i * 0.1) }}
                   className="relative flex gap-6"
                 >
                   <div className={`mt-1.5 w-6 h-6 rounded-full border-4 border-[#0F172A] bg-${activity.color === 'emerald' ? 'emerald-500' : activity.color === 'purple' ? 'purple-500' : activity.color === 'blue' ? 'blue-500' : 'slate-500'} shrink-0 z-10 shadow-lg`} />
                   <div>
                      <p className="text-white font-black text-lg mb-1">{activity.user}</p>
                      <p className="text-slate-400 font-medium text-sm mb-2 leading-relaxed">{activity.action}</p>
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-wider">{activity.time}</span>
                   </div>
                 </motion.div>
               ))}
            </div>

            <button className="mt-12 w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black transition border border-white/5">
               عرض السجل الكامل
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
