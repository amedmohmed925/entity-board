"use client";

import { useState, useEffect } from 'react';
import { SuperAdminSidebar } from '@/components/layout/SuperAdminSidebar';
import Link from 'next/link';

type IntegrationCard = {
  id: string;
  name: string;
  description: string;
  state: 'نشط' | 'متوقف';
  stateClass: string;
  health: string;
  lastSync: string;
  warning?: string;
  icon: 'mail' | 'brain' | 'payment';
};

type WebhookLog = {
  id: string;
  status: '200 OK' | '500 ERROR';
  provider: string;
  event: string;
  path: string;
  time: string;
};

const integrationCards: IntegrationCard[] = [
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'خدمة إرسال رسائل البريد الإلكتروني',
    state: 'متوقف',
    stateClass: 'bg-slate-500/20 text-slate-300',
    health: 'فشل في الإرسال (3)',
    lastSync: 'منذ ساعتين',
    warning: 'حالة التوصيل غير مستقرة',
    icon: 'mail',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'خدمات الذكاء الاصطناعي GPT-4',
    state: 'نشط',
    stateClass: 'bg-amber-500/20 text-amber-300',
    health: '$12.45',
    lastSync: '$487.50',
    warning: 'تنبيه سعة الاستخدام',
    icon: 'brain',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'بوابة الدفع الإلكتروني والاشتراكات',
    state: 'نشط',
    stateClass: 'bg-emerald-500/20 text-emerald-300',
    health: '99.8%',
    lastSync: 'منذ 3 دقائق',
    icon: 'payment',
  },
];

const webhookLogs: WebhookLog[] = [
  {
    id: '1',
    status: '200 OK',
    provider: 'Stripe',
    event: 'payment_intent.succeeded',
    path: '/api/hooks/stripe',
    time: '12:45:02 م',
  },
  {
    id: '2',
    status: '500 ERROR',
    provider: 'OpenAI',
    event: 'chat.completion',
    path: '/api/ai/process',
    time: '12:42:15 م',
  },
  {
    id: '3',
    status: '200 OK',
    provider: 'Custom Hook',
    event: 'user.registered',
    path: '/webhooks/crm-sync',
    time: '12:38:44 م',
  },
  {
    id: '4',
    status: '200 OK',
    provider: 'Stripe',
    event: 'customer.created',
    path: '/api/hooks/stripe',
    time: '12:30:10 م',
  },
];

function ServiceIcon({ type }: { type: IntegrationCard['icon'] }) {
  if (type === 'mail') {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 7l8.5 6L20 7m-16 0h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
      </svg>
    );
  }

  if (type === 'brain') {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3a4 4 0 014 4v1a3 3 0 013 3v1a4 4 0 01-4 4h-1v2a3 3 0 11-6 0v-2H7a4 4 0 01-4-4v-1a3 3 0 013-3V7a4 4 0 014-4h2z" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 7h16M4 11h16M7 15h1m4 0h5M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
    </svg>
  );
}

export default function SuperAdminIntegrationsPage() {
  const [mounted, setMounted] = useState(false);
  const [cards, setCards] = useState<IntegrationCard[]>(integrationCards);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleIntegrationState = (id: string) => {
    setCards(currentCards => 
      currentCards.map(card => {
        if (card.id === id) {
          const newState = card.state === 'نشط' ? 'متوقف' : 'نشط';
          const newStateClass = newState === 'نشط' 
            ? 'bg-emerald-500/20 text-emerald-300' 
            : 'bg-slate-500/20 text-slate-300';
          return { ...card, state: newState, stateClass: newStateClass };
        }
        return card;
      })
    );
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#050A19] text-white">
      <div className="mx-auto max-w-[1440px] p-3 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          <SuperAdminSidebar />

          <section className="flex-1 rounded-3xl border border-[#1A2A4A] bg-[#080F23] p-4 md:p-6 relative overflow-hidden">
            {/* Atmospheric Background glow */}
            <div className="absolute top-[10%] left-[20%] h-[300px] w-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

            <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10 transition-all duration-700 opacity-100 translate-y-0">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white">إدارة التكاملات والويب هوك</h1>
                <p className="mt-1 text-sm text-slate-400">قم بربط خدماتك الخارجية وإدارة تدفق البيانات التلقائي بين الأنظمة المختلفة</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 hover:scale-105"
                >
                  <span className="text-base leading-none">+</span>
                  إضافة خدمة جديدة
                </button>
                <button type="button" className="rounded-xl border border-[#1A2A4A] bg-[#0D1632] p-2.5 text-slate-300 transition hover:bg-[#132042]" aria-label="الوضع الداكن">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 1012 21a8.96 8.96 0 008.354-5.646z" />
                  </svg>
                </button>
                <Link href="/super-admin/notifications" className="relative rounded-xl border border-[#1A2A4A] bg-[#0D1632] p-2.5 text-slate-300 transition hover:bg-[#132042]" aria-label="الإشعارات">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 opacity-90 px-1 text-[8px] font-black text-white animate-pulse">
                    3
                  </span>
                </Link>
              </div>
            </header>

            <section className="grid grid-cols-1 gap-4 xl:grid-cols-3 relative z-10">
              {cards.map((card, index) => (
                <article 
                  key={card.id} 
                  className={`rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 group relative overflow-hidden ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Subtle active glow inside card */}
                  {card.state === 'نشط' && <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />}

                  <div className="mb-5 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleIntegrationState(card.id)}
                        className={`relative inline-flex h-6 w-11 rounded-full p-0.5 transition-colors duration-300 ${card.state === 'نشط' ? 'bg-blue-600' : 'bg-[#1A2A4A]'}`}
                        aria-label={`تبديل حالة ${card.name}`}
                      >
                        {/* 
                          Fix: In RTL, right is the starting edge.
                          Translate to left implies moving deeper into the element layout negatively (e.g. -translate-x-5).
                        */}
                        <span className={`h-5 w-5 rounded-full bg-white transition-transform duration-300 shadow-md ${card.state === 'نشط' ? '-translate-x-[20px]' : 'translate-x-0'}`} />
                      </button>
                      <span className={`rounded-full px-2 py-1 text-[10px] font-bold transition-colors ${card.stateClass}`}>{card.state}</span>
                    </div>
                    <div className="rounded-xl bg-[#0A132C] p-2 text-blue-300 transition-transform group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:text-blue-400">
                      <ServiceIcon type={card.icon} />
                    </div>
                  </div>

                  <h3 className="text-3xl font-black text-white relative z-10 transition-colors group-hover:text-blue-300">{card.name}</h3>
                  <p className="mt-2 text-sm text-slate-400 relative z-10">{card.description}</p>

                  {card.warning && (
                    <p className="mt-3 text-xs font-bold text-amber-300 relative z-10 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse block" />
                      {card.warning}
                    </p>
                  )}

                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#1A2A4A] pt-4 text-xs relative z-10">
                    <div>
                      <p className="text-slate-500">مؤشر الخدمة</p>
                      <p className="mt-1 font-bold text-white">{card.health}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">آخر تحديث</p>
                      <p className="mt-1 font-bold text-white">{card.lastSync}</p>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <section className={`mt-5 rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4 relative z-10 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">سجلات الويب هوك (Webhooks)</h2>
                  <p className="mt-1 text-sm text-slate-400">عرض حالة تدفق الأحداث التكاملية لحظيًا</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-[#132042] hover:border-[#2b4172]">تصفية</button>
                  <button type="button" className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-[#132042] hover:border-[#2b4172]">تحديث</button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-[#1A2A4A] bg-[#0A132C]">
                <table className="w-full min-w-[880px] text-right">
                  <thead>
                    <tr className="border-b border-[#1A2A4A] text-xs text-slate-400">
                      <th className="px-4 py-3 font-semibold">الحالة</th>
                      <th className="px-4 py-3 font-semibold">الخدمة</th>
                      <th className="px-4 py-3 font-semibold">الحدث (EVENT)</th>
                      <th className="px-4 py-3 font-semibold">المسار (URL)</th>
                      <th className="px-4 py-3 font-semibold">الوقت</th>
                      <th className="px-4 py-3 font-semibold">عرض</th>
                    </tr>
                  </thead>
                  <tbody>
                    {webhookLogs.map((log) => (
                      <tr key={log.id} className="border-b border-[#15203B] text-sm text-slate-200 last:border-b-0 hover:bg-[#121c38] transition-colors group">
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-2 font-bold ${log.status === '200 OK' ? 'text-emerald-300' : 'text-rose-300'}`}>
                            <span className={`h-2 w-2 rounded-full ${log.status === '200 OK' ? 'bg-emerald-400' : 'bg-rose-400 animate-pulse'}`} />
                            {log.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-bold text-white group-hover:text-blue-300 transition-colors">{log.provider}</td>
                        <td className="px-4 py-4">
                          <span className="rounded-md bg-[#1A2A4A] px-2 py-1 text-[11px] font-bold text-slate-300">{log.event}</span>
                        </td>
                        <td className="px-4 py-4 text-slate-400">{log.path}</td>
                        <td className="px-4 py-4 text-slate-500">{log.time}</td>
                        <td className="px-4 py-4">
                          <button type="button" className="rounded-md bg-white/5 p-2 text-slate-300 transition opacity-100 lg:opacity-60 lg:group-hover:opacity-100 hover:bg-white/10 hover:text-white" aria-label="عرض السجل">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.5 12s3.5-6.5 10.5-6.5S22.5 12 22.5 12 19 18.5 12 18.5 1.5 12 1.5 12zm10.5 3a3 3 0 100-6 3 3 0 000 6z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-col gap-3 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                  <button type="button" className="rounded-md border border-[#1A2A4A] bg-[#0A132C] px-3 py-2 text-slate-300 transition hover:bg-[#132042] hover:text-white">السابق</button>
                  <button type="button" className="rounded-md bg-blue-600 px-3 py-2 font-bold text-white transition hover:bg-blue-500 shadow-md shadow-blue-500/20">التالي</button>
                </div>
                <p>عرض 4 من أصل 1,240 سجل</p>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
