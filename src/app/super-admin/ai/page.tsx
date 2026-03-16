"use client";

import { useEffect, useState } from 'react';
import { SuperAdminSidebar } from '@/components/layout/SuperAdminSidebar';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

type AiMetric = {
  id: string;
  title: string;
  value: number;
  suffix: string;
  decimals: number;
  note: string;
  tone: 'good' | 'warning' | 'danger';
};

type AiCostRow = {
  id: string;
  organization: string;
  model: string;
  tokens: string;
  cost: string;
  utilization: number;
  status: 'مستقر' | 'مرتفع' | 'حرج';
  hardLimit: string;
  modelBadge: string;
};

type SystemAlert = {
  id: string;
  title: string;
  description: string;
  level: 'critical' | 'warning';
};

const aiMetrics: AiMetric[] = [
  {
    id: 'throughput',
    title: 'نسبة العمليات / الاستقرار',
    value: 42,
    suffix: '%',
    decimals: 0,
    note: '+6% عن الساعة الماضية',
    tone: 'good',
  },
  {
    id: 'failure-rate',
    title: 'معدل فشل الجلسات',
    value: 28,
    suffix: '%',
    decimals: 0,
    note: 'مرتفع',
    tone: 'warning',
  },
  {
    id: 'latency',
    title: 'زمن الاستجابة',
    value: 1.2,
    suffix: ' ثانية',
    decimals: 1,
    note: 'تجاوز 0.3s ضمن الحدود',
    tone: 'danger',
  },
];

const aiCostRows: AiCostRow[] = [
  {
    id: '1',
    organization: 'الشركة العربية للخدمات',
    model: 'AM',
    tokens: '1.2M Tokens',
    cost: '$240.50',
    utilization: 45,
    status: 'مستقر',
    hardLimit: '$300',
    modelBadge: 'bg-sky-500/20 text-sky-300',
  },
  {
    id: '2',
    organization: 'مؤسسة الهلال للحلول التقنية',
    model: 'KP',
    tokens: '4.8M Tokens',
    cost: '$912.00',
    utilization: 82,
    status: 'مرتفع',
    hardLimit: '$1,200',
    modelBadge: 'bg-violet-500/20 text-violet-300',
  },
  {
    id: '3',
    organization: 'شركة نيوتك للذكاء',
    model: 'NT',
    tokens: '12.5M Tokens',
    cost: '$2,450.00',
    utilization: 99,
    status: 'حرج',
    hardLimit: '$2,500',
    modelBadge: 'bg-cyan-500/20 text-cyan-300',
  },
];

const alerts: SystemAlert[] = [
  {
    id: 'quota',
    title: 'تجاوز حد الاستهلاك لأحد النماذج',
    description: 'AM تجاوز الحد اليومي بنسبة 8% في آخر 90 دقيقة.',
    level: 'critical',
  },
  {
    id: 'latency',
    title: 'ارتفاع مفاجئ في زمن الاستجابة',
    description: 'v4Completion ارتفع 2.5x خلال نافذة تحميل قصيرة.',
    level: 'warning',
  },
];

const monthDistribution = [
  { month: 'السبت', value: 35 },
  { month: 'الأحد', value: 48 },
  { month: 'الإثنين', value: 42 },
  { month: 'الثلاثاء', value: 59 },
  { month: 'الأربعاء', value: 64 },
  { month: 'الخميس', value: 52 },
  { month: 'الجمعة', value: 46 },
];

export default function SuperAdminAiPage() {
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
            {/* Atmospheric subtle glow mimicking a neural network node */}
            <div className="absolute top-[20%] lg:top-[10%] left-[10%] h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

            <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10 transition-all duration-700 opacity-100 translate-y-0">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white">مراقبة صحة النظام والذكاء الاصطناعي</h1>
                <p className="mt-1 text-sm text-slate-400">متابعة الأداء المباشر وتكاليف استهلاك الذكاء لبيئاتك التشغيلية</p>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] animate-pulse">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                عمليات ذكاء نشطة
              </span>
            </header>

            <section className={`mb-5 rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 relative z-10 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-black text-white">مؤشرات الأداء الحيوية</h2>
                <div className="flex items-center gap-2">
                   <div className="flex space-x-1 space-x-reverse">
                      <div className="w-1 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                   </div>
                   <span className="text-xs font-bold text-blue-300">مباشر</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {aiMetrics.map((metric, index) => (
                  <article 
                    key={metric.id} 
                    className={`rounded-2xl border border-[#1A2A4A] bg-[#0A132C] p-4 transition-all duration-500 hover:-translate-y-1 hover:border-slate-600/50 group ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}  
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{metric.title}</span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full shadow-[0_0_8px_currentColor] ${
                          metric.tone === 'good'
                            ? 'bg-emerald-400 text-emerald-400'
                            : metric.tone === 'warning'
                              ? 'bg-amber-400 text-amber-400'
                              : 'bg-rose-400 text-rose-400'
                        }`}
                      />
                    </div>

                    <p className="text-4xl font-black text-white">
                      {mounted ? (
                         <AnimatedCounter
                            value={metric.value}
                            suffix={metric.suffix}
                            decimals={metric.decimals}
                         />
                      ) : (
                          `0${metric.suffix}`
                      )}
                    </p>
                    <p
                      className={`mt-2 text-xs font-bold ${
                        metric.tone === 'good'
                          ? 'text-emerald-300'
                          : metric.tone === 'warning'
                            ? 'text-amber-300'
                            : 'text-rose-300'
                      }`}
                    >
                      {metric.note}
                    </p>

                    <div className="mt-4 h-1.5 rounded-full bg-[#1A2A4A] overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-[2000ms] ease-out w-0 ${
                          metric.tone === 'good'
                            ? 'bg-emerald-400'
                            : metric.tone === 'warning'
                              ? 'bg-amber-400'
                              : 'bg-rose-400'
                        }`}
                        style={{ width: mounted ? `${metric.value}%` : '0%' }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={`rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 relative z-10 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-xl font-black text-white">مراقبة تكاليف الذكاء الاصطناعي</h2>
                <button type="button" className="text-sm font-bold text-blue-300 transition hover:text-blue-200 hover:underline">
                  تحميل التقرير الكامل
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-[#1A2A4A] bg-[#0A132C]">
                <table className="w-full min-w-[900px] text-right">
                  <thead>
                    <tr className="border-b border-[#1A2A4A] text-xs text-slate-400">
                      <th className="px-4 py-3 font-semibold">المؤسسة / النموذج</th>
                      <th className="px-4 py-3 font-semibold">استهلاك التوكن</th>
                      <th className="px-4 py-3 font-semibold">التكلفة (USD)</th>
                      <th className="px-4 py-3 font-semibold">الحالة الاستهلاكية</th>
                      <th className="px-4 py-3 font-semibold">الحد الأقصى الشهري</th>
                      <th className="px-4 py-3 font-semibold">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiCostRows.map((row) => (
                      <tr key={row.id} className="border-b border-[#15203B] text-sm text-slate-200 last:border-b-0 hover:bg-[#121c38] transition-colors group">
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="font-bold text-white group-hover:text-blue-300 transition-colors">{row.organization}</p>
                              <p className="text-xs text-slate-500">{row.model}</p>
                            </div>
                            <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${row.modelBadge}`}>{row.model}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-slate-300">{row.tokens}</td>
                        <td className="px-4 py-4 font-bold text-white">{row.cost}</td>
                        <td className="px-4 py-4">
                          <div className="mb-2 flex items-center justify-between text-xs">
                            <span
                              className={`font-bold ${
                                row.status === 'مستقر'
                                  ? 'text-emerald-300'
                                  : row.status === 'مرتفع'
                                    ? 'text-amber-300'
                                    : 'text-rose-300'
                              }`}
                            >
                              {row.status}
                            </span>
                            <span className="text-slate-500">{row.utilization}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[#1A2A4A] overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-[1500ms] ease-out w-0 ${
                                row.status === 'مستقر'
                                  ? 'bg-emerald-400'
                                  : row.status === 'مرتفع'
                                    ? 'bg-amber-400'
                                    : 'bg-rose-400'
                              }`}
                              style={{ width: mounted ? `${row.utilization}%` : '0%' }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-lg bg-[#1A2A4A] px-3 py-1 text-xs font-bold text-slate-300">{row.hardLimit}</span>
                        </td>
                        <td className="px-4 py-4">
                          <button type="button" className="rounded-md bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 opacity-60 group-hover:opacity-100 hover:text-white" aria-label="تعديل السقف">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.86 3.49a2.1 2.1 0 113 3L8 18.35 3 20l1.65-5L16.86 3.49z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-end border-t border-[#1A2A4A] px-4 py-3 text-xs text-slate-500">
                  إجمالي الاستهلاك الشهري: 
                  <span className="mr-2 font-bold text-slate-300">
                      {mounted ? <AnimatedCounter value={3602.50} prefix="$" decimals={2} duration={2500} /> : "$0.00"}
                  </span>
                </div>
              </div>
            </section>

            <section className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2 relative z-10 transition-all duration-700 delay-500">
              <article className={`rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <h3 className="mb-4 text-lg font-black text-white">توزيع التكاليف الأسبوعي</h3>
                <div className="h-52 rounded-xl border border-[#1A2A4A] bg-[#0A132C] p-4">
                  <div className="flex h-full items-end gap-2 group">
                    {monthDistribution.map((item, index) => (
                      <div key={item.month} className="flex flex-1 flex-col items-center justify-end gap-2">
                        <div 
                          className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-1000 ease-out h-0 hover:from-blue-500 hover:to-cyan-300" 
                          style={{ 
                              height: mounted ? `${item.value}%` : '0%',
                              transitionDelay: `${index * 100}ms`
                          }} 
                        />
                        <span className="text-[10px] text-slate-500 hidden sm:block">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <article className={`rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 ${mounted ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-black text-white">تنبيهات النظام الحرجة</h3>
                  <span className="text-amber-300 animate-pulse text-lg">⚠</span>
                </div>

                <div className="space-y-3">
                  {alerts.map((alert, idx) => (
                    <div
                      key={alert.id}
                      className={`rounded-xl border p-3 flex flex-col gap-1 transition-all duration-500 ease-out hover:scale-[1.02] ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'} ${
                        alert.level === 'critical'
                          ? 'border-rose-500/40 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.15)] ring-1 ring-inset ring-rose-500/20'
                          : 'border-amber-500/40 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.1)] ring-1 ring-inset ring-amber-500/20'
                      }`}
                      style={{ transitionDelay: `${200 + idx * 150}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-bold ${
                            alert.level === 'critical' ? 'text-rose-300' : 'text-amber-300'
                          }`}
                        >
                          {alert.title}
                        </p>
                        <span className="animate-pulse">{alert.level === 'critical' ? '⛔' : '◇'}</span>
                      </div>
                      <p className="text-xs text-slate-300/90">{alert.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
