'use client';

import { useState } from 'react';
import { CreateApiKeyModal } from '@/components/layout/CreateApiKeyModal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/Toast';

const stats = [
  { 
    label: 'إجمالي المفاتيح', 
    value: 12, 
    trend: '+2 هذا الشهر', 
    trendColor: 'bg-emerald-500/20 text-emerald-400',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    )
  },
  { 
    label: 'المفاتيح النشطة', 
    value: 8, 
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconColor: 'text-emerald-500'
  },
  { 
    label: 'معدل الاستخدام (اليوم)', 
    value: 4.2, 
    suffix: 'k',
    decimals: 1,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    iconColor: 'text-amber-500'
  },
  { 
    label: 'أخطاء المصادقة', 
    value: 3, 
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    iconColor: 'text-rose-500'
  },
];

const apiKeys = [
  {
    id: 1,
    name: 'Shopify Connector',
    description: 'متجر التجزئة الرئيسي',
    key: 'sk_live_****' + (process.env.NEXT_PUBLIC_SHOPIFY_API_KEY?.slice(-4) || '8932'),
    fullKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY || 'sk_live_1234567890abcdef12345678',
    scope: 'READ/WRITE',
    date: '2023-10-01',
    status: 'نشط',
    lastUsed: 'منذ ساعتين'
  },
  {
    id: 2,
    name: 'Mobile App',
    description: 'تطبيق iOS/Android',
    key: 'sk_live_****' + (process.env.NEXT_PUBLIC_MOBILE_APP_API_KEY?.slice(-4) || '4421'),
    fullKey: process.env.NEXT_PUBLIC_MOBILE_APP_API_KEY || 'sk_live_0987654321fedcba09876543',
    scope: 'READ ONLY',
    date: '2023-08-15',
    status: 'ملغى',
    lastUsed: 'منذ 3 أيام'
  },
  {
    id: 3,
    name: 'Test Environment',
    description: 'التطوير الداخلي',
    key: 'sk_test_****' + (process.env.NEXT_PUBLIC_TEST_API_KEY?.slice(-4) || '1209'),
    fullKey: process.env.NEXT_PUBLIC_TEST_API_KEY || 'sk_test_1234567890abcdef12345678_test',
    scope: 'FULL ADMIN',
    date: '2023-11-20',
    status: 'نشط',
    lastUsed: 'منذ دقيقتين'
  }
];

export default function ApiKeysPage() {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    showToast('تم نسخ مفتاح API بنجاح');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-10"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">إدارة مفاتيح الـ API</h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">قم بإنشاء وإدارة مفاتيح الوصول الآمن لتطبيقاتك</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-700 hover:-translate-y-1 active:scale-95"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          إنشاء مفتاح جديد
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="group relative rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-[#1A2A4A] dark:bg-[#0A1126]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-2xl p-3 bg-slate-50 dark:bg-white/5 ${stat.iconColor || 'text-blue-500'} group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500`}>
                {stat.icon}
              </div>
              {stat.trend && (
                <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${stat.trendColor}`}>
                  {stat.trend}
                </span>
              )}
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="mt-2 text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                  <AnimatedCounter 
                    value={stat.value as number} 
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix || ""}
                  />
                </p>
              </div>
              {/* Subtle sparkline mock */}
              <div className="h-8 w-16 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                 <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0 35 Q 25 35 40 20 T 80 10 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" className={stat.iconColor || 'text-blue-500'} />
                 </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="rounded-[32px] border border-slate-200 bg-white dark:border-[#1A2A4A] dark:bg-[#0A1126] overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-[#1A2A4A]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">المفاتيح الحالية</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="البحث عن مفتاح..." 
              className="w-64 rounded-xl border border-slate-200 bg-slate-50 px-10 py-2.5 text-sm outline-none transition focus:border-blue-500 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-white"
            />
            <svg className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto text-right" dir="rtl">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/5">
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">اسم المفتاح</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">مفتاح الـ API</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">الصلاحيات</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">الحالة</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">تاريخ الإنشاء</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">آخر استخدام</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#1A2A4A]">
              {apiKeys.map((key) => (
                <tr key={key.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{key.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{key.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <code className="rounded bg-slate-100 px-2 py-1 text-[11px] font-mono dark:bg-white/10">{key.key}</code>
                       <button 
                         onClick={() => copyKey(key.fullKey || '')}
                         className="text-slate-400 hover:text-blue-500 transition active:scale-90"
                       >
                         <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                         </svg>
                       </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-xl px-2.5 py-1 text-[10px] font-bold ${
                      key.scope === 'FULL ADMIN' 
                        ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20' 
                        : key.scope === 'READ/WRITE' 
                          ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                          : 'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                    }`}>
                      {key.scope}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${key.status === 'نشط' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      <span className="text-xs font-bold">{key.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-slate-400">{key.date}</td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-slate-400">{key.lastUsed}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-500 dark:hover:bg-white/5">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-rose-500 dark:hover:bg-white/5">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      </button>
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-white/5">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Info */}
        <div className="border-t border-slate-100 p-6 dark:border-[#1A2A4A] flex items-center justify-between">
            <div className="flex gap-2">
                <button className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 dark:border-[#1A2A4A] dark:bg-white/5">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 dark:border-[#1A2A4A] dark:bg-white/5">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">عرض 1-3 من أصل 12 مفتاح</p>
        </div>
      </div>

      {/* Security Alert */}
      <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 dark:bg-amber-500/10">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-amber-500 p-3 text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-600 dark:text-amber-500">تنبيه أمني هام</h3>
            <p className="mt-1 text-sm text-amber-700/80 dark:text-amber-500/80 leading-relaxed">
              تذكر دائماً عدم مشاركة مفاتيح الـ API في الأكواد المصدرية العامة. استخدم متغيرات البيئة (Environment Variables) لحماية بياناتك من الاختراقات المحتملة. إذا تم تسريب أي مفتاح، قم بإلغائه فوراً وإنشاء مفتاح جديد.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CreateApiKeyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </motion.div>
  );
}
