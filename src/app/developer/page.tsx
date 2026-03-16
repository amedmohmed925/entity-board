'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DeveloperOverviewPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-10"
    >
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-[40px] bg-blue-600 p-8 text-white md:p-12 shadow-2xl shadow-blue-600/20">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/30 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            Live System Status: Healthy
          </div>
          <h1 className="text-4xl font-black md:text-5xl tracking-tight">مرحباً بك في مركز المطورين، أحمد!</h1>
          <p className="mt-4 text-lg text-blue-100/90 leading-relaxed font-medium">
            استكشف أدواتنا المتقدمة ووثائقنا الشاملة للبدء في دمج خدماتنا مع تطبيقاتك بسلاسة وسرعة.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link 
              href="/developer/api-keys"
              className="rounded-2xl bg-white px-8 py-4 text-sm font-black text-blue-600 shadow-xl transition-all hover:bg-blue-50 hover:-translate-y-1 active:scale-95"
            >
              إدارة مفاتيح API
            </Link>
            <Link 
              href="/developer/docs"
              className="rounded-2xl bg-blue-500/30 px-8 py-4 text-sm font-black text-white border border-blue-400/30 backdrop-blur-sm transition-all hover:bg-blue-500/40 hover:-translate-y-1 active:scale-95"
            >
              اقرأ التوثيق
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 right-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-20 animate-in zoom-in duration-1000">
           <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
           </svg>
        </div>
      </div>

      {/* Quick Start Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'تكامل الـ API',
            desc: 'ابدأ فوراً باستخدام مفاتيح API الخاصة بنا. يدعم نظامنا RESTful APIs مع استجابات JSON سريعة.',
            href: '/developer/api-keys',
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            ),
            color: 'blue'
          },
          {
            title: 'الويبهوك (Webhooks)',
            desc: 'احصل على تحديثات في الوقت الفعلي حول الأحداث الهامة مباشرة في تطبيقك عبر Webhooks.',
            href: '/developer/webhooks',
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            ),
            color: 'purple'
          },
          {
            title: 'سجل النشاط والاخطاء',
            desc: 'راقب جميع طلبات الـ API الخاصة بك وتتبع الأخطاء في الوقت الفعلي لتحسين أداء تطبيقك.',
            href: '/developer/logs',
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            ),
            color: 'rose'
          }
        ].map((item, i) => (
          <div 
            key={i} 
            className="group relative rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-[#1A2A4A] dark:bg-[#0A1126] hover:-translate-y-2"
            style={{ animationDelay: `${(i + 2) * 100}ms` }}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-${item.color}-500/10 text-${item.color}-500 transition-all duration-500 group-hover:scale-110 group-hover:bg-${item.color}-500 group-hover:text-white group-hover:rotate-12`}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {item.icon}
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-black dark:text-white tracking-tight">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {item.desc}
            </p>
            <Link href={item.href} className="mt-6 flex items-center gap-2 text-sm font-black text-blue-500 hover:gap-3 transition-all">
              انتقل الآن
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="flex flex-col items-center justify-between gap-6 rounded-[32px] bg-slate-100 p-8 dark:bg-white/5 md:flex-row border border-slate-200 dark:border-white/5">
        <div>
          <h4 className="text-xl font-black text-slate-900 dark:text-white">هل تحتاج للمساعدة؟</h4>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">فريق الدعم المخصص للمطورين متاح دائماً للإجابة على استفساراتك.</p>
        </div>
        <button className="rounded-2xl bg-slate-900 px-10 py-4 text-sm font-black text-white transition-all hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-600/20">
          تواصل مع الدعم الفني
        </button>
      </div>
    </motion.div>
  );
}
