import { SuperAdminSidebar } from '@/components/layout/SuperAdminSidebar';

type TenantStat = {
  id: string;
  title: string;
  value: string;
  note: string;
  noteColor: string;
  hasProgress?: boolean;
  progressValue?: number;
};

type TenantRow = {
  id: string;
  companyName: string;
  companyDomain: string;
  ownerName: string;
  ownerEmail: string;
  plan: 'ENTERPRISE' | 'PRO' | 'BASIC';
  status: 'نشط' | 'معلق';
  joinedAt: string;
  usedQuota: string;
  totalQuota: string;
  usagePercent: number;
  usageColor: string;
};

const tenantStats: TenantStat[] = [
  {
    id: 'companies-total',
    title: 'إجمالي الشركات',
    value: '1,248',
    note: '%12 زيادة هذا الشهر',
    noteColor: 'text-emerald-400',
  },
  {
    id: 'active-users',
    title: 'نشط حالياً',
    value: '1,120',
    note: '89% نسبة التشغيل',
    noteColor: 'text-sky-400',
  },
  {
    id: 'pending-review',
    title: 'بانتظار المراجعة',
    value: '14',
    note: 'طلبات تحتاج اجراء',
    noteColor: 'text-amber-400',
  },
  {
    id: 'storage-usage',
    title: 'استخدام السعة',
    value: '68%',
    note: '850GB / 1TB',
    noteColor: 'text-slate-400',
    hasProgress: true,
    progressValue: 68,
  },
];

const tenantRows: TenantRow[] = [
  {
    id: '1',
    companyName: 'التقنية للأصول الرقمية',
    companyDomain: 'tech.kayan.sa',
    ownerName: 'سالم محمد',
    ownerEmail: 'salem@kayan-tech.sa',
    plan: 'ENTERPRISE',
    status: 'نشط',
    joinedAt: '12 يناير 2024',
    usedQuota: '850GB',
    totalQuota: '1TB',
    usagePercent: 68,
    usageColor: 'bg-blue-500',
  },
  {
    id: '2',
    companyName: 'اللوجستية العربية',
    companyDomain: 'logistics.kayan.sa',
    ownerName: 'فهد العتيبي',
    ownerEmail: 'fahad@logistics.com',
    plan: 'PRO',
    status: 'معلق',
    joinedAt: '05 فبراير 2024',
    usedQuota: '120GB',
    totalQuota: '500GB',
    usagePercent: 24,
    usageColor: 'bg-sky-500',
  },
  {
    id: '3',
    companyName: 'متجر زاد للتمور',
    companyDomain: 'dates.kayan.sa',
    ownerName: 'نورة القحطاني',
    ownerEmail: 'nora@zad.store',
    plan: 'BASIC',
    status: 'نشط',
    joinedAt: '10 مارس 2024',
    usedQuota: '95GB',
    totalQuota: '100GB',
    usagePercent: 95,
    usageColor: 'bg-rose-500',
  },
];

const planStyles: Record<TenantRow['plan'], string> = {
  ENTERPRISE: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  PRO: 'bg-violet-500/15 text-violet-300 border border-violet-500/30',
  BASIC: 'bg-slate-500/15 text-slate-300 border border-slate-500/30',
};

export default function UsersTeamsPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#050A19] text-white">
      <div className="mx-auto max-w-[1440px] p-3 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          <SuperAdminSidebar />

          <section className="flex-1 rounded-3xl border border-[#1A2A4A] bg-[#080F23] p-4 md:p-6">
            <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-black text-white">إدارة الشركات والمستأجرين</h1>
                <p className="mt-1 text-sm text-slate-400">متابعة الشركات، المالكين، وخطط الاشتراك من مكان واحد</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
                >
                  <span className="text-base leading-none">+</span>
                  إضافة شركة جديدة
                </button>
                <button
                  type="button"
                  aria-label="الإشعارات"
                  className="rounded-xl border border-[#1A2A4A] bg-[#0D1632] p-2.5 text-slate-300 transition hover:bg-[#111D3F]"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
            </header>

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {tenantStats.map((stat) => (
                <article key={stat.id} className="rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4">
                  <p className="text-xs text-slate-400">{stat.title}</p>
                  <p className="mt-1 text-3xl font-black text-white">{stat.value}</p>
                  <p className={`mt-1 text-xs font-bold ${stat.noteColor}`}>{stat.note}</p>

                  {stat.hasProgress && (
                    <div className="mt-4 h-2 rounded-full bg-[#1A2A4A]">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: `${stat.progressValue || 0}%` }} />
                    </div>
                  )}
                </article>
              ))}
            </section>

            <section className="mt-4 rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative flex-1">
                  <input
                    type="text"
                    readOnly
                    value="ابحث عن شركة، مالك، او بريد إلكتروني..."
                    className="w-full rounded-xl border border-[#1A2A4A] bg-[#0A132C] px-11 py-2.5 text-sm text-slate-400 outline-none"
                  />
                  <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z" />
                  </svg>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-4 py-2 text-sm text-slate-300 transition hover:bg-[#111D3F]">
                    كل الخطط
                  </button>
                  <button type="button" className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-4 py-2 text-sm text-slate-300 transition hover:bg-[#111D3F]">
                    كل الحالات
                  </button>
                  <button type="button" className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-4 py-2 text-sm text-slate-300 transition hover:bg-[#111D3F]">
                    فلترة متقدمة
                  </button>
                  <button type="button" className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-[#111D3F]">
                    تصدير
                  </button>
                </div>
              </div>
            </section>

            <section className="mt-4 overflow-hidden rounded-2xl border border-[#1A2A4A] bg-[#0D1632]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] text-right">
                  <thead>
                    <tr className="border-b border-[#1A2A4A] text-xs text-slate-400">
                      <th className="px-4 py-4 font-semibold">اسم الشركة</th>
                      <th className="px-4 py-4 font-semibold">المالك</th>
                      <th className="px-4 py-4 font-semibold">الباقة</th>
                      <th className="px-4 py-4 font-semibold">الحالة</th>
                      <th className="px-4 py-4 font-semibold">تاريخ الانضمام</th>
                      <th className="px-4 py-4 font-semibold">السعة (QUOTA)</th>
                      <th className="px-4 py-4 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenantRows.map((tenant) => (
                      <tr key={tenant.id} className="border-b border-[#15203B] text-sm text-slate-200">
                        <td className="px-4 py-4">
                          <div className="font-bold text-white">{tenant.companyName}</div>
                          <div className="text-xs text-slate-500">{tenant.companyDomain}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div>{tenant.ownerName}</div>
                          <div className="text-xs text-slate-500">{tenant.ownerEmail}</div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${planStyles[tenant.plan]}`}>{tenant.plan}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-2 font-bold ${tenant.status === 'نشط' ? 'text-emerald-400' : 'text-amber-400'}`}>
                            <span className={`h-2 w-2 rounded-full ${tenant.status === 'نشط' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            {tenant.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-400">{tenant.joinedAt}</td>
                        <td className="px-4 py-4">
                          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                            <span>{tenant.totalQuota}</span>
                            <span>{tenant.usedQuota}</span>
                          </div>
                          <div className="h-2 rounded-full bg-[#1A2A4A]">
                            <div className={`h-2 rounded-full ${tenant.usageColor}`} style={{ width: `${tenant.usagePercent}%` }} />
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button type="button" className="rounded-md bg-white/5 p-2 text-slate-300 transition hover:bg-white/10" aria-label="خيارات">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01" />
                              </svg>
                            </button>
                            <button type="button" className="rounded-md bg-white/5 p-2 text-slate-300 transition hover:bg-white/10" aria-label="عرض">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                              </svg>
                            </button>
                            <button type="button" className="rounded-md bg-orange-500 p-2 text-white transition hover:bg-orange-400" aria-label="دخول">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 8l4 4-4 4m4-4H3" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#1A2A4A] px-4 py-3 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                  <button type="button" className="h-7 w-7 rounded-md border border-[#1A2A4A] bg-[#0A132C] text-slate-300">&lt;</button>
                  <button type="button" className="h-7 min-w-7 rounded-md border border-[#1A2A4A] bg-blue-600 px-2 font-bold text-white">1</button>
                  <button type="button" className="h-7 min-w-7 rounded-md border border-[#1A2A4A] bg-[#0A132C] px-2 text-slate-300">2</button>
                  <button type="button" className="h-7 min-w-7 rounded-md border border-[#1A2A4A] bg-[#0A132C] px-2 text-slate-300">3</button>
                  <span className="px-1">...</span>
                  <button type="button" className="h-7 min-w-7 rounded-md border border-[#1A2A4A] bg-[#0A132C] px-2 text-slate-300">42</button>
                  <button type="button" className="h-7 w-7 rounded-md border border-[#1A2A4A] bg-[#0A132C] text-slate-300">&gt;</button>
                </div>
                <p>عرض 1 إلى 3 من أصل 1,248 شركة</p>
              </div>
            </section>

            <section className="mt-4 rounded-2xl border border-amber-500/20 bg-[linear-gradient(90deg,rgba(251,146,60,0.12),rgba(251,146,60,0.04),transparent)] p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-black text-amber-300">تنبيه النظام</p>
                  <p className="text-sm text-amber-100/80">
                    هناك 3 شركات تم تعليق حساباتها تلقائياً بسبب تجاوز خطة التخزين بنسبة 110%، يرجى مراجعة التفاصيل.
                  </p>
                </div>
                <button type="button" className="self-start rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-bold text-amber-300 transition hover:bg-amber-500/20 md:self-auto">
                  عرض الشركات
                </button>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
