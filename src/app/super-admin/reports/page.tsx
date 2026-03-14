"use client";

import { useMemo, useState } from 'react';
import { SuperAdminSidebar } from '@/components/layout/SuperAdminSidebar';

type ReportMetric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: 'good' | 'warning' | 'neutral';
};

type ReportRow = {
  id: string;
  name: string;
  owner: string;
  type: 'تشغيلي' | 'مالي' | 'ذكاء أعمال';
  createdAt: string;
  status: 'جاهز' | 'قيد المعالجة' | 'مجدول';
  size: string;
};

const reportMetrics: ReportMetric[] = [
  {
    id: 'generated',
    label: 'التقارير المولدة اليوم',
    value: '184',
    delta: '+12% عن الأمس',
    tone: 'good',
  },
  {
    id: 'scheduled',
    label: 'تقارير مجدولة',
    value: '37',
    delta: '5 تحتاج مراجعة',
    tone: 'warning',
  },
  {
    id: 'avg-time',
    label: 'متوسط زمن التوليد',
    value: '48 ثانية',
    delta: 'ضمن المستوى المستهدف',
    tone: 'neutral',
  },
  {
    id: 'downloads',
    label: 'التنزيلات هذا الأسبوع',
    value: '2,430',
    delta: '+8% نمو مستمر',
    tone: 'good',
  },
];

const reports: ReportRow[] = [
  {
    id: '1',
    name: 'تقرير أداء الاشتراكات الشهري',
    owner: 'فريق المالية',
    type: 'مالي',
    createdAt: '14 مارس 2026 - 10:24 ص',
    status: 'جاهز',
    size: '2.8 MB',
  },
  {
    id: '2',
    name: 'تقرير نشاط المستخدمين النشطين',
    owner: 'فريق المنتج',
    type: 'ذكاء أعمال',
    createdAt: '14 مارس 2026 - 09:10 ص',
    status: 'قيد المعالجة',
    size: '—',
  },
  {
    id: '3',
    name: 'تقرير البنية التشغيلية للخدمات',
    owner: 'فريق العمليات',
    type: 'تشغيلي',
    createdAt: '13 مارس 2026 - 11:55 م',
    status: 'جاهز',
    size: '4.1 MB',
  },
  {
    id: '4',
    name: 'تقرير التنبؤ بالمخاطر المالية',
    owner: 'مكتب التحليل',
    type: 'مالي',
    createdAt: 'مجدول - يوميًا 08:00 ص',
    status: 'مجدول',
    size: '—',
  },
];

const quickExports = ['PDF', 'CSV', 'XLSX', 'JSON'];

const reportTypeFilters = ['الكل', 'تشغيلي', 'مالي', 'ذكاء أعمال'] as const;
const reportStatusFilters = ['الكل', 'جاهز', 'قيد المعالجة', 'مجدول'] as const;

type ReportTypeFilter = (typeof reportTypeFilters)[number];
type ReportStatusFilter = (typeof reportStatusFilters)[number];

export default function SuperAdminReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ReportTypeFilter>('الكل');
  const [statusFilter, setStatusFilter] = useState<ReportStatusFilter>('الكل');

  const filteredReports = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        report.name.toLowerCase().includes(normalizedQuery) ||
        report.owner.toLowerCase().includes(normalizedQuery) ||
        report.type.toLowerCase().includes(normalizedQuery);
      const matchesType = typeFilter === 'الكل' || report.type === typeFilter;
      const matchesStatus = statusFilter === 'الكل' || report.status === statusFilter;

      return matchesQuery && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  return (
    <main dir="rtl" className="min-h-screen bg-[#050A19] text-white">
      <div className="mx-auto max-w-[1440px] p-3 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <SuperAdminSidebar />

          <section className="min-w-0 flex-1 rounded-3xl border border-[#1A2A4A] bg-[#080F23] p-4 md:p-6">
            <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-black text-white">مركز التقارير</h1>
                <p className="mt-1 text-sm text-slate-400">إنشاء ومتابعة ومشاركة التقارير التنفيذية بشكل موحد عبر النظام</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
                >
                  <span className="text-base leading-none">+</span>
                  إنشاء تقرير جديد
                </button>
                <button type="button" className="rounded-xl border border-[#1A2A4A] bg-[#0D1632] px-4 py-2.5 text-sm font-bold text-slate-300">
                  آخر 30 يوم
                </button>
              </div>
            </header>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {reportMetrics.map((metric) => (
                <article key={metric.id} className="rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4">
                  <p className="text-sm text-slate-400">{metric.label}</p>
                  <p className="mt-2 text-4xl font-black text-white">{metric.value}</p>
                  <p
                    className={`mt-2 text-xs font-bold ${
                      metric.tone === 'good'
                        ? 'text-emerald-300'
                        : metric.tone === 'warning'
                          ? 'text-amber-300'
                          : 'text-slate-300'
                    }`}
                  >
                    {metric.delta}
                  </p>
                </article>
              ))}
            </section>

            <section className="mt-5 grid grid-cols-1 gap-4 2xl:grid-cols-[minmax(0,1fr)_300px]">
              <article className="min-w-0 rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="relative w-full max-w-lg">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="ابحث عن تقرير، فريق، أو نوع..."
                      className="w-full rounded-xl border border-[#1A2A4A] bg-[#0A132C] px-10 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none"
                    />
                    <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z" />
                    </svg>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={typeFilter}
                      onChange={(event) => setTypeFilter(event.target.value as ReportTypeFilter)}
                      className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-3 py-2 text-sm text-slate-300 outline-none"
                      aria-label="تصفية حسب النوع"
                    >
                      {reportTypeFilters.map((option) => (
                        <option key={option} value={option} className="bg-[#0A132C] text-slate-200">
                          النوع: {option}
                        </option>
                      ))}
                    </select>
                    <select
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value as ReportStatusFilter)}
                      className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-3 py-2 text-sm text-slate-300 outline-none"
                      aria-label="تصفية حسب الحالة"
                    >
                      {reportStatusFilters.map((option) => (
                        <option key={option} value={option} className="bg-[#0A132C] text-slate-200">
                          الحالة: {option}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setTypeFilter('الكل');
                        setStatusFilter('الكل');
                      }}
                      className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-4 py-2 text-sm text-slate-300 transition hover:bg-[#132042]"
                    >
                      إعادة الضبط
                    </button>
                  </div>
                </div>

                <p className="mb-3 text-xs text-slate-400">عدد النتائج: {filteredReports.length}</p>

                <div className="w-full overflow-x-auto rounded-2xl border border-[#1A2A4A] bg-[#0A132C]">
                  <table className="w-full min-w-[760px] xl:min-w-[900px] text-right">
                    <thead>
                      <tr className="border-b border-[#1A2A4A] text-xs text-slate-400">
                        <th className="px-4 py-3 font-semibold">اسم التقرير</th>
                        <th className="px-4 py-3 font-semibold">الفريق/المالك</th>
                        <th className="px-4 py-3 font-semibold">النوع</th>
                        <th className="px-4 py-3 font-semibold">وقت الإنشاء</th>
                        <th className="px-4 py-3 font-semibold">الحالة</th>
                        <th className="px-4 py-3 font-semibold">الحجم</th>
                        <th className="px-4 py-3 font-semibold">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map((report) => (
                        <tr key={report.id} className="border-b border-[#15203B] text-sm text-slate-200 last:border-b-0">
                          <td className="px-4 py-4 font-bold text-white">{report.name}</td>
                          <td className="px-4 py-4 text-slate-300">{report.owner}</td>
                          <td className="px-4 py-4">
                            <span className="rounded-md bg-[#1A2A4A] px-2 py-1 text-[11px] font-bold text-slate-300">{report.type}</span>
                          </td>
                          <td className="px-4 py-4 text-slate-400">{report.createdAt}</td>
                          <td className="px-4 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-bold ${
                                report.status === 'جاهز'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : report.status === 'قيد المعالجة'
                                    ? 'bg-amber-500/20 text-amber-300'
                                    : 'bg-sky-500/20 text-sky-300'
                              }`}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-slate-400">{report.size}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button type="button" className="rounded-md bg-white/5 p-2 text-slate-300 transition hover:bg-white/10" aria-label="عرض">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.5 12s3.5-6.5 10.5-6.5S22.5 12 22.5 12 19 18.5 12 18.5 1.5 12 1.5 12zm10.5 3a3 3 0 100-6 3 3 0 000 6z" />
                                </svg>
                              </button>
                              <button type="button" className="rounded-md bg-blue-600 p-2 text-white transition hover:bg-blue-500" aria-label="تنزيل">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v12m0 0l4-4m-4 4l-4-4M4 21h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredReports.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-400">
                            لا توجد تقارير مطابقة لخيارات البحث والتصفية الحالية.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </article>

              <aside className="space-y-4">
                <article className="rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4">
                  <h3 className="mb-3 text-lg font-black text-white">تنزيلات سريعة</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {quickExports.map((format) => (
                      <button
                        key={format}
                        type="button"
                        className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] px-3 py-2 text-sm font-bold text-slate-300 transition hover:bg-[#132042]"
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </article>

                <article className="rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4">
                  <h3 className="mb-3 text-lg font-black text-white">آخر نشاطات التقارير</h3>
                  <div className="space-y-3 text-sm">
                    <div className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] p-3">
                      <p className="font-bold text-white">تقرير مالي تم توليده</p>
                      <p className="mt-1 text-xs text-slate-400">منذ 5 دقائق بواسطة فريق المالية</p>
                    </div>
                    <div className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] p-3">
                      <p className="font-bold text-white">تقرير مجدول بدأ المعالجة</p>
                      <p className="mt-1 text-xs text-slate-400">منذ 14 دقيقة بواسطة النظام</p>
                    </div>
                    <div className="rounded-lg border border-[#1A2A4A] bg-[#0A132C] p-3">
                      <p className="font-bold text-white">تنزيل تقرير ذكاء أعمال</p>
                      <p className="mt-1 text-xs text-slate-400">منذ 28 دقيقة بواسطة إدارة العمليات</p>
                    </div>
                  </div>
                </article>
              </aside>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
