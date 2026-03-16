"use client";

import { SuperAdminSidebar } from '@/components/layout/SuperAdminSidebar';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { useEffect, useState } from 'react';

type FinanceMetric = {
  id: string;
  title: string;
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  trend: string;
  trendColor: string;
  icon: 'revenue' | 'pending' | 'refund';
};

type TransactionRow = {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: string;
  status: 'ناجحة' | 'فاشلة';
  date: string;
  ref: string;
};

const financeMetrics: FinanceMetric[] = [
  {
    id: 'revenue',
    title: 'إجمالي الإيرادات',
    value: 128450.00,
    prefix: '',
    suffix: ' ر.س',
    decimals: 2,
    trend: '+21% ↗',
    trendColor: 'text-emerald-400',
    icon: 'revenue',
  },
  {
    id: 'pending',
    title: 'الفواتير المعلقة',
    value: 34190.00,
    prefix: '',
    suffix: ' ر.س',
    decimals: 2,
    trend: '14 فاتورة',
    trendColor: 'text-amber-400',
    icon: 'pending',
  },
  {
    id: 'refunds',
    title: 'طلبات الاسترداد',
    value: 4200.00,
    prefix: '',
    suffix: ' ر.س',
    decimals: 2,
    trend: '-2.7% ↘',
    trendColor: 'text-rose-400',
    icon: 'refund',
  },
];

const transactions: TransactionRow[] = [
  {
    id: '1',
    customerName: 'سالم محمد',
    customerEmail: 'salem@example.com',
    amount: '٢,٥٠٠.٠٠ ر.س',
    status: 'ناجحة',
    date: '13 أكتوبر 2023',
    ref: '#TRX-882190',
  },
  {
    id: '2',
    customerName: 'ليان حسام',
    customerEmail: 'layan@example.com',
    amount: '١,٢٠٠.٠٠ ر.س',
    status: 'فاشلة',
    date: '11 أكتوبر 2023',
    ref: '#TRX-882189',
  },
  {
    id: '3',
    customerName: 'فهد خالد',
    customerEmail: 'fahad@example.com',
    amount: '٥٨٠.٠٠ ر.س',
    status: 'ناجحة',
    date: '10 أكتوبر 2023',
    ref: '#TRX-882188',
  },
  {
    id: '4',
    customerName: 'أمل ناصر',
    customerEmail: 'amal@example.com',
    amount: '٩٥٠.٠٠ ر.س',
    status: 'ناجحة',
    date: '09 أكتوبر 2023',
    ref: '#TRX-882187',
  },
];

function MetricIcon({ type }: { type: FinanceMetric['icon'] }) {
  if (type === 'revenue') {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 14l4-4 4 4 8-8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20 8v5h-5" />
      </svg>
    );
  }

  if (type === 'pending') {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 14l2 2 4-4m1-8H8a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V8l-4-4z" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 10h11M9 21V3m9 9a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

export default function SuperAdminPlansPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main dir="rtl" className="min-h-screen bg-[#050A19] text-white">
      <div className="mx-auto max-w-[1440px] p-3 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          <SuperAdminSidebar />

          <section className="flex-1 rounded-3xl border border-[#1A2A4A] bg-[#080F23] p-4 md:p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

            <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10 transition-all duration-700 opacity-100 translate-y-0">
              <div>
                <h1 className="text-3xl font-black text-white">الشؤون المالية والفوترة</h1>
                <p className="mt-1 text-sm text-slate-400">إدارة الإيرادات، الفواتير، وسجل المعاملات المالية من لوحة واحدة</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-xl border border-[#1A2A4A] bg-[#0D1632] p-2.5 text-slate-300 transition hover:bg-[#111D3F]"
                  aria-label="الوضع الليلي"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 1012 21a8.96 8.96 0 008.354-5.646z" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="الإشعارات"
                  className="relative rounded-xl border border-[#1A2A4A] bg-[#0D1632] p-2.5 text-slate-300 transition hover:bg-[#111D3F]"
                >
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 relative z-10">
              {financeMetrics.map((metric, index) => (
                <article 
                  key={metric.id} 
                  className={`rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 group ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`text-xs font-bold ${metric.trendColor}`}>{metric.trend}</p>
                      <p className="mt-5 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{metric.title}</p>
                      <p className="mt-2 text-3xl xl:text-4xl font-black tracking-tight text-white">
                         {mounted ? (
                            <AnimatedCounter 
                               value={metric.value} 
                               prefix={metric.prefix}
                               suffix={metric.suffix}
                               decimals={metric.decimals}
                               duration={1800 + index * 200}
                            />
                         ) : (
                             `${metric.prefix}0${metric.suffix}`
                         )}
                      </p>
                    </div>
                    <div className={`rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${metric.icon === 'revenue' ? 'bg-emerald-500/10 text-emerald-300' : metric.icon === 'pending' ? 'bg-amber-500/10 text-amber-300' : 'bg-rose-500/10 text-rose-300'}`}>
                      <MetricIcon type={metric.icon} />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <section className={`mt-5 rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 relative z-10 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">سجل المعاملات</h2>
                  <p className="mt-1 text-sm text-slate-400">عرض وإدارة جميع التحويلات المالية الواردة والصادرة</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" className="rounded-lg border border-[#1A2A4A] bg-[#16213A] px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-[#1C2947] hover:border-[#2b4172]">
                    تصدير CSV
                  </button>
                  <button type="button" className="rounded-lg border border-[#1A2A4A] bg-[#16213A] px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-[#1C2947] hover:border-[#2b4172]">
                    تصفية
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-[#1A2A4A] bg-[#0B1430]">
                <table className="w-full min-w-[880px] text-right">
                  <thead>
                    <tr className="border-b border-[#1A2A4A] text-xs text-slate-400">
                      <th className="px-4 py-4 font-semibold">العميل</th>
                      <th className="px-4 py-4 font-semibold">تاريخ المعاملة</th>
                      <th className="px-4 py-4 font-semibold">المبلغ</th>
                      <th className="px-4 py-4 font-semibold">الحالة</th>
                      <th className="px-4 py-4 font-semibold">رقم العملية</th>
                      <th className="px-4 py-4 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((row) => (
                      <tr 
                        key={row.id} 
                        className="border-b border-[#15203B] text-sm text-slate-200 last:border-b-0 hover:bg-[#121c38] transition-colors group cursor-pointer"
                      >
                        <td className="px-4 py-4">
                          <div className="font-bold text-white group-hover:text-blue-300 transition-colors">{row.customerName}</div>
                          <div className="text-xs text-slate-500">{row.customerEmail}</div>
                        </td>
                        <td className="px-4 py-4 text-slate-400">{row.date}</td>
                        <td className="px-4 py-4 font-bold text-white">{row.amount}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${row.status === 'ناجحة' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'}`}>
                            <span className={`h-2 w-2 rounded-full ${row.status === 'ناجحة' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-xs font-semibold text-slate-500 group-hover:text-slate-400 transition-colors">{row.ref}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 opacity-100 lg:opacity-60 lg:group-hover:opacity-100 transition-opacity">
                            <button type="button" className="rounded-md bg-white/5 px-2.5 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white">⋮</button>
                            <button type="button" className="rounded-md bg-white/5 px-2.5 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white">↗</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-col gap-3 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                  <button type="button" className="h-8 w-8 rounded-md border border-[#1A2A4A] bg-[#0A132C] text-slate-300 transition hover:bg-[#122041]">&lt;</button>
                  <button type="button" className="h-8 w-8 rounded-md border border-[#1A2A4A] bg-[#0A132C] text-slate-300 transition hover:bg-[#122041]">٣</button>
                  <button type="button" className="h-8 w-8 rounded-md border border-[#1A2A4A] bg-[#0A132C] text-slate-300 transition hover:bg-[#122041]">٢</button>
                  <button type="button" className="h-8 w-8 rounded-md border border-[#1A2A4A] bg-blue-600 font-bold text-white transition hover:bg-blue-500">١</button>
                  <button type="button" className="h-8 w-8 rounded-md border border-[#1A2A4A] bg-[#0A132C] text-slate-300 transition hover:bg-[#122041]">&gt;</button>
                </div>
                <p>عرض 1 إلى 4 من أصل 142 معاملة</p>
              </div>
            </section>

            <section className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2 relative z-10">
              <article className={`rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-6 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <h3 className="text-2xl font-black text-white">إدارة المبالغ المستردة</h3>
                <p className="mt-2 text-sm text-slate-400">مراجعة طلبات استرداد الأموال ومعالجتها وفق السياسات.</p>
                <button
                  type="button"
                  className="mt-6 rounded-xl bg-[#1B2847] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#22325A] hover:shadow-lg hover:shadow-blue-500/10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  عرض الطلبات
                </button>
              </article>

              <article className={`relative overflow-hidden rounded-2xl bg-gradient-to-l from-[#2F36FF] to-[#2430C9] p-6 transition-all duration-700 delay-600 group ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
                <h3 className="text-2xl font-black text-white relative z-10">إصدار فاتورة يدوية</h3>
                <p className="mt-2 text-sm text-blue-100/85 relative z-10">يمكنك إنشاء فاتورة مخصصة لعميل محدد بسرعة وسهولة.</p>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-[#1F2AD6] shadow-lg transition hover:bg-blue-50 hover:shadow-xl hover:scale-105 relative z-10"
                >
                  <span className="text-lg leading-none">+</span>
                  إنشاء فاتورة الآن
                </button>
              </article>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
