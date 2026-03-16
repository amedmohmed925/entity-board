"use client";

import { useState } from 'react';
import { SuperAdminSidebar } from '@/components/layout/SuperAdminSidebar';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

type TenantStat = {
  id: string;
  title: string;
  value: number; // Changed to number for counter
  suffix?: string;
  note: string;
  noteColor: string;
  hasProgress?: boolean;
  progressValue?: number;
};

type PlanType = 'ENTERPRISE' | 'PRO' | 'BASIC';
type StatusType = 'نشط' | 'معلق';

type TenantRow = {
  id: string;
  companyName: string;
  companyDomain: string;
  ownerName: string;
  ownerEmail: string;
  plan: PlanType;
  status: StatusType;
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
    value: 1248,
    note: '%12 زيادة هذا الشهر',
    noteColor: 'text-emerald-400',
  },
  {
    id: 'active-users',
    title: 'نشط حالياً',
    value: 1120,
    note: '89% نسبة التشغيل',
    noteColor: 'text-sky-400',
  },
  {
    id: 'pending-review',
    title: 'بانتظار المراجعة',
    value: 14,
    note: 'طلبات تحتاج اجراء',
    noteColor: 'text-amber-400',
  },
  {
    id: 'storage-usage',
    title: 'استخدام السعة',
    value: 68,
    suffix: '%',
    note: '850GB / 1TB',
    noteColor: 'text-slate-400',
    hasProgress: true,
    progressValue: 68,
  },
];

const initialTenantRows: TenantRow[] = [
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
  const [tenants, setTenants] = useState<TenantRow[]>(initialTenantRows);
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState<PlanType | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusType | 'ALL'>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Company Form State
  const [newCompany, setNewCompany] = useState<Partial<TenantRow>>({
    companyName: '',
    companyDomain: '',
    ownerName: '',
    ownerEmail: '',
    plan: 'PRO',
    status: 'نشط'
  });

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = 
        tenant.companyName.includes(searchQuery) ||
        tenant.ownerName.includes(searchQuery) ||
        tenant.companyDomain.includes(searchQuery) || 
        tenant.ownerEmail.includes(searchQuery);
    
    const matchesPlan = planFilter === 'ALL' || tenant.plan === planFilter;
    const matchesStatus = statusFilter === 'ALL' || tenant.status === statusFilter;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleAddCompany = () => {
      if(!newCompany.companyName || !newCompany.ownerName || !newCompany.companyDomain) {
          alert("يرجى تعبئة الحقول الأساسية");
          return;
      }

      const today = new Intl.DateTimeFormat('ar-EG', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date());

      const tenantToAdd: TenantRow = {
          id: `new-${Date.now()}`,
          companyName: newCompany.companyName!,
          companyDomain: newCompany.companyDomain!,
          ownerName: newCompany.ownerName!,
          ownerEmail: newCompany.ownerEmail || `${newCompany.ownerName?.split(' ')[0]}@${newCompany.companyDomain}`,
          plan: newCompany.plan as PlanType,
          status: newCompany.status as StatusType,
          joinedAt: today,
          usedQuota: '0GB',
          totalQuota: newCompany.plan === 'ENTERPRISE' ? '1TB' : newCompany.plan === 'PRO' ? '500GB' : '100GB',
          usagePercent: 0,
          usageColor: newCompany.plan === 'ENTERPRISE' ? 'bg-blue-500' : 'bg-sky-500'
      };

      setTenants([tenantToAdd, ...tenants]);
      setIsAddModalOpen(false);
      setNewCompany({ companyName: '', companyDomain: '', ownerName: '', ownerEmail: '', plan: 'PRO', status: 'نشط' }); // reset
  }

  const handleDelete = (id: string) => {
      if(confirm('هل أنت متأكد من حذف هذه الشركة؟')) {
         setTenants(tenants.filter(t => t.id !== id));
      }
  }

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
                  onClick={() => setIsAddModalOpen(true)}
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
              {tenantStats.map((stat, idx) => (
                <article key={stat.id} className="rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4">
                  <p className="text-xs text-slate-400">{stat.title}</p>
                  <p className="mt-1 text-3xl font-black text-white">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1500 + (idx * 200)} />
                  </p>
                  <p className={`mt-1 text-xs font-bold ${stat.noteColor}`}>{stat.note}</p>

                  {stat.hasProgress && (
                    <div className="mt-4 h-2 rounded-full bg-[#1A2A4A] overflow-hidden relative">
                      {/* Using an animated width using Tailwind arbitrary values or inline style with transition */}
                      <div className="h-full bg-blue-500 transition-all duration-[2000ms] ease-out w-0" style={{ width: `${stat.progressValue || 0}%` }} />
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
                    placeholder="ابحث عن شركة، مالك، او بريد إلكتروني..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-[#1A2A4A] bg-[#0A132C] px-11 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500 transition"
                  />
                  <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z" />
                  </svg>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select 
                     value={planFilter}
                     onChange={(e) => setPlanFilter(e.target.value as any)}
                     className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-4 py-2 text-sm text-slate-300 transition hover:bg-[#111D3F] outline-none">
                      <option value="ALL">كل الخطط</option>
                      <option value="ENTERPRISE">ENTERPRISE</option>
                      <option value="PRO">PRO</option>
                      <option value="BASIC">BASIC</option>
                  </select>
                  <select 
                     value={statusFilter}
                     onChange={(e) => setStatusFilter(e.target.value as any)}
                     className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-4 py-2 text-sm text-slate-300 transition hover:bg-[#111D3F] outline-none">
                      <option value="ALL">كل الحالات</option>
                      <option value="نشط">نشط</option>
                      <option value="معلق">معلق</option>
                  </select>
                  <button type="button" className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-4 py-2 text-sm text-slate-300 transition hover:bg-[#111D3F]">
                    فلترة متقدمة
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
                    {filteredTenants.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-4 py-8 text-center text-slate-500">لا توجد شركات مطابقة للبحث</td>
                        </tr>
                    ) : filteredTenants.map((tenant) => (
                      <tr key={tenant.id} className="border-b border-[#15203B] text-sm text-slate-200 hover:bg-[#121c38] transition-colors">
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
                            <div className={`h-2 rounded-full ${tenant.usageColor} transition-all duration-1000`} style={{ width: `${tenant.usagePercent}%` }} />
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleDelete(tenant.id)} type="button" className="rounded-md bg-white/5 p-2 text-slate-300 transition hover:bg-red-500/20 hover:text-red-400" aria-label="حذف">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
                  <button type="button" className="h-7 w-7 rounded-md border border-[#1A2A4A] bg-[#0A132C] text-slate-300 transition hover:bg-[#122041]">&lt;</button>
                  <button type="button" className="h-7 min-w-7 rounded-md border border-[#1A2A4A] bg-blue-600 px-2 font-bold text-white">1</button>
                  <button type="button" className="h-7 min-w-7 rounded-md border border-[#1A2A4A] bg-[#0A132C] px-2 text-slate-300 transition hover:bg-[#122041]">2</button>
                  <button type="button" className="h-7 min-w-7 rounded-md border border-[#1A2A4A] bg-[#0A132C] px-2 text-slate-300 transition hover:bg-[#122041]">3</button>
                  <span className="px-1">...</span>
                  <button type="button" className="h-7 min-w-7 rounded-md border border-[#1A2A4A] bg-[#0A132C] px-2 text-slate-300 transition hover:bg-[#122041]">42</button>
                  <button type="button" className="h-7 w-7 rounded-md border border-[#1A2A4A] bg-[#0A132C] text-slate-300 transition hover:bg-[#122041]">&gt;</button>
                </div>
                <p>عرض 1 إلى {Math.min(filteredTenants.length, 10)} من أصل {tenants.length} شركة</p>
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

      {/* Add Company Modal */}
      {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <div className="bg-[#080F23] border border-[#1A2A4A] rounded-2xl w-full max-w-md flex flex-col shadow-2xl overflow-hidden">
                  <div className="bg-[#0D1632] p-5 border-b border-[#1A2A4A] flex justify-between items-center">
                      <h2 className="text-xl font-bold text-white">إضافة شركة جديدة</h2>
                      <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                      <div>
                          <label className="text-xs text-slate-400 block mb-1">اسم الشركة</label>
                          <input 
                              type="text" 
                              value={newCompany.companyName}
                              onChange={e => setNewCompany({...newCompany, companyName: e.target.value})}
                              className="w-full bg-[#0A132C] border border-[#1A2A4A] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" 
                              placeholder="مثال: التقنية المتقدمة"
                          />
                      </div>
                      <div>
                          <label className="text-xs text-slate-400 block mb-1">النطاق أو الدومين</label>
                          <input 
                              type="text" 
                              value={newCompany.companyDomain}
                              onChange={e => setNewCompany({...newCompany, companyDomain: e.target.value})}
                              className="w-full bg-[#0A132C] border border-[#1A2A4A] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                              placeholder="مثال: tech.com" 
                          />
                      </div>
                      <div>
                          <label className="text-xs text-slate-400 block mb-1">اسم المالك</label>
                          <input 
                              type="text" 
                              value={newCompany.ownerName}
                              onChange={e => setNewCompany({...newCompany, ownerName: e.target.value})}
                              className="w-full bg-[#0A132C] border border-[#1A2A4A] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" 
                              placeholder="أحمد محمد"
                          />
                      </div>
                       <div className="grid grid-cols-2 gap-3">
                          <div>
                              <label className="text-xs text-slate-400 block mb-1">الباقة</label>
                              <select 
                                  value={newCompany.plan}
                                  onChange={e => setNewCompany({...newCompany, plan: e.target.value as any})}
                                  className="w-full bg-[#0A132C] border border-[#1A2A4A] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                              >
                                  <option value="ENTERPRISE">ENTERPRISE</option>
                                  <option value="PRO">PRO</option>
                                  <option value="BASIC">BASIC</option>
                              </select>
                          </div>
                           <div>
                              <label className="text-xs text-slate-400 block mb-1">الحالة</label>
                              <select 
                                  value={newCompany.status}
                                  onChange={e => setNewCompany({...newCompany, status: e.target.value as any})}
                                  className="w-full bg-[#0A132C] border border-[#1A2A4A] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                              >
                                  <option value="نشط">نشط</option>
                                  <option value="معلق">معلق</option>
                              </select>
                          </div>
                      </div>
                  </div>
                  <div className="p-5 border-t border-[#1A2A4A] bg-[#0D1632] flex gap-3 justify-end">
                      <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm text-slate-300 font-bold hover:text-white transition">إلغاء</button>
                      <button onClick={handleAddCompany} className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-500 font-bold text-white rounded-lg shadow-lg shadow-blue-600/20 transition">إضافة</button>
                  </div>
              </div>
          </div>
      )}
    </main>
  );
}
