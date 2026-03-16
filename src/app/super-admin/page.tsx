"use client";

import { useEffect, useState } from 'react';
import { SuperAdminSidebar } from '@/components/layout/SuperAdminSidebar';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

type StatCard = {
  id: string;
  title: string;
  value: number;
  prefix: string;
  suffix: string;
  decimals: number;
  trend: string;
  trendColor: string;
};

const statCards: StatCard[] = [
  {
    id: 'revenue',
    title: 'الإيرادات المتكررة شهرياً',
    value: 45280.00,
    prefix: '$',
    suffix: '',
    decimals: 2,
    trend: '+12.5% ↗',
    trendColor: 'text-emerald-400',
  },
  {
    id: 'active',
    title: 'المستخدمون النشطون',
    value: 12840,
    prefix: '',
    suffix: '',
    decimals: 0,
    trend: '+5.2% ↗',
    trendColor: 'text-emerald-400',
  },
  {
    id: 'churn',
    title: 'معدل الإلغاء الشهري',
    value: 2.41,
    prefix: '',
    suffix: '%',
    decimals: 2,
    trend: '0.8% ↘',
    trendColor: 'text-rose-400',
  },
  {
    id: 'cac',
    title: 'تكلفة اكتساب العميل',
    value: 1150.32,
    prefix: '$',
    suffix: '',
    decimals: 2,
    trend: '14% ↘',
    trendColor: 'text-rose-400',
  },
];

const activityRows = [
  {
    type: 'SIGNUP',
    actor: 'شركة تجريبية جديدة',
    action: 'تسجيل حساب مؤسسة جديد',
    status: 'مكتمل',
    at: 'منذ 3 دقائق',
    badge: 'bg-sky-500/20 text-sky-300',
  },
  {
    type: 'UPGRADE',
    actor: 'خالد القحطاني',
    action: 'ترقية إلى الباقة الاحترافية',
    status: 'مكتمل',
    at: 'منذ 15 دقيقة',
    badge: 'bg-violet-500/20 text-violet-300',
  },
  {
    type: 'ERROR',
    actor: 'نظام المزامنة',
    action: 'فشل استدعاء API الخارجي',
    status: 'فشل',
    at: 'منذ 42 دقيقة',
    badge: 'bg-rose-500/20 text-rose-300',
  },
  {
    type: 'SYSTEM',
    actor: 'الخادم الرئيسي',
    action: 'تحديث إعدادات تتبع التوكن',
    status: 'قيد التنفيذ',
    at: 'منذ ساعة',
    badge: 'bg-amber-500/20 text-amber-300',
  },
];

export default function SuperAdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main dir="rtl" className="min-h-screen bg-[#050A19] text-white">
      <div className="mx-auto max-w-[1440px] p-3 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          <SuperAdminSidebar />

          <section className="flex-1 rounded-3xl border border-[#1A2A4A] bg-[#080F23] p-4 md:p-6 overflow-hidden relative">
            {/* Subtle atmospheric glow in the background */}
            <div className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10 transition-all duration-700 opacity-100 translate-y-0 translate-x-0">
              <div>
                <h1 className="text-3xl font-black text-white">نظرة عامة على النظام</h1>
                <p className="mt-1 text-sm text-slate-400">تحليلات لحظية لبيانات المنصة التشغيلية</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-full max-w-xs transition-all duration-300 focus-within:scale-105">
                  <input
                    type="text"
                    placeholder="بحث في النظام..."
                    className="w-full rounded-xl border border-[#1A2A4A] bg-[#0D1632] px-10 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500 focus:bg-[#0A132C] transition-colors"
                  />
                  <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z" />
                  </svg>
                </div>
                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-300 animate-pulse border border-amber-500/30">API Latency: High</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 relative z-10">
              {statCards.map((card, index) => (
                <article 
                   key={card.id} 
                   className={`rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-blue-500/10 group ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                   style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <p className={`text-xs font-bold ${card.trendColor}`}>{card.trend}</p>
                  <p className="mt-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{card.title}</p>
                  <p className="mt-2 text-2xl font-black text-white">
                      {mounted ? (
                        <AnimatedCounter 
                            value={card.value} 
                            prefix={card.prefix} 
                            suffix={card.suffix} 
                            decimals={card.decimals} 
                            duration={1500 + index * 300} 
                        />
                      ) : (
                          `${card.prefix}0${card.suffix}`
                      )}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr] relative z-10">
              <article className={`rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <h2 className="text-sm font-bold text-white">توزيع باقات الاشتراك</h2>
                <div className="mt-5 space-y-5">
                  <div className="group">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                      <span>الباقة المجانية</span>
                      <span>45%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#162341] overflow-hidden">
                      <div className="h-full bg-blue-400 transition-all duration-[1500ms] ease-out w-0" style={{ width: mounted ? '45%' : '0%' }} />
                    </div>
                  </div>
                  <div className="group">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                      <span>الباقة الاحترافية</span>
                      <span>38%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#162341] overflow-hidden">
                      <div className="h-full bg-violet-400 transition-all duration-[1500ms] delay-100 ease-out w-0" style={{ width: mounted ? '38%' : '0%' }} />
                    </div>
                  </div>
                  <div className="group">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                      <span>باقة المؤسسات</span>
                      <span>17%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#162341] overflow-hidden">
                      <div className="h-full bg-cyan-400 transition-all duration-[1500ms] delay-200 ease-out w-0" style={{ width: mounted ? '17%' : '0%' }} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-[#1A2A4A] bg-[#0A132C] p-3 text-xs text-slate-400 transition-all duration-300 hover:border-blue-500/30 hover:bg-[#0D1836]">
                  إجمالي الإيرادات السنوية
                  <p className="mt-1 text-base font-black text-blue-300">
                    <AnimatedCounter value={1.2} prefix="$" suffix="M" decimals={1} duration={2500} />
                  </p>
                </div>
              </article>

              <article className={`rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-white">التسجيلات الجديدة (آخر 7 أيام)</h2>
                  <span className="rounded-lg bg-blue-600/15 px-2 py-1 text-[11px] font-bold text-blue-300">أسبوعي</span>
                </div>

                <div className="relative h-[260px] overflow-hidden rounded-xl border border-[#1A2A4A] bg-[#0A132C] p-4 group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_55%)] transition-opacity duration-500 group-hover:opacity-100 opacity-70" />
                  <svg viewBox="0 0 620 260" className="relative h-full w-full">
                    <defs>
                      <linearGradient id="super-admin-line" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 210 C 70 190, 90 85, 160 105 C 220 120, 245 235, 300 160 C 350 85, 380 25, 430 95 C 500 190, 560 250, 620 70"
                      fill="none"
                      stroke="url(#super-admin-line)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="chart-line drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    />
                  </svg>
                  <div className="pointer-events-none absolute inset-x-4 top-4 flex justify-between text-[11px] text-slate-500">
                    <span>2000</span>
                    <span>1500</span>
                    <span>1000</span>
                    <span>500</span>
                  </div>
                  <div className="pointer-events-none absolute inset-x-4 bottom-3 flex justify-between text-[11px] text-slate-500">
                    <span>السبت</span>
                    <span>الأحد</span>
                    <span>الإثنين</span>
                    <span>الثلاثاء</span>
                    <span>الأربعاء</span>
                    <span>الخميس</span>
                    <span>الجمعة</span>
                  </div>
                </div>
              </article>
            </div>

            <article className={`mt-4 rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} relative z-10`}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-black text-white">آخر العمليات والنشاطات</h2>
                <button type="button" className="text-sm font-bold text-blue-300 transition hover:text-blue-200">
                  عرض جميع السجلات ←
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-right">
                  <thead>
                    <tr className="border-b border-[#1A2A4A] text-xs text-slate-400">
                      <th className="pb-3 px-2 font-semibold">النوع</th>
                      <th className="pb-3 px-2 font-semibold">المستخدم / المصدر</th>
                      <th className="pb-3 px-2 font-semibold">العملية</th>
                      <th className="pb-3 px-2 font-semibold">الحالة</th>
                      <th className="pb-3 px-2 font-semibold">التوقيت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityRows.map((row, index) => (
                      <tr 
                         key={`${row.type}-${row.at}`} 
                         className={`border-b border-[#15203B] text-sm text-slate-300 transition-all duration-500 hover:bg-[#121c38] ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                         style={{ transitionDelay: `${600 + (index * 100)}ms` }}
                      >
                        <td className="py-3 px-2">
                          <span className={`rounded-md px-2 py-1 text-[11px] font-bold ${row.badge}`}>{row.type}</span>
                        </td>
                        <td className="py-3 px-2">{row.actor}</td>
                        <td className="py-3 px-2">{row.action}</td>
                        <td className={`py-3 px-2 font-bold ${row.status === 'فشل' ? 'text-rose-400' : row.status === 'قيد التنفيذ' ? 'text-sky-300' : 'text-emerald-400'}`}>
                          <span className="flex items-center gap-1.5">
                             <span className={`h-1.5 w-1.5 rounded-full ${row.status === 'فشل' ? 'bg-rose-400' : row.status === 'قيد التنفيذ' ? 'bg-sky-400' : 'bg-emerald-400'}`} />
                             {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-slate-500">{row.at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </section>
        </div>
      </div>

      <style jsx>{`
        .chart-line {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: drawLine 2.2s ease-out forwards;
          animation-delay: 0.5s;
        }

        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </main>
  );
}
