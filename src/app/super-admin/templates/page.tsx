import { SuperAdminSidebar } from '@/components/layout/SuperAdminSidebar';

type TemplateCategory = {
  id: string;
  label: string;
  active?: boolean;
};

type TemplateCard = {
  id: string;
  name: string;
  description: string;
  tag: 'تحليل' | 'تخطيط' | 'تقرير';
  accent: string;
};

const categories: TemplateCategory[] = [
  { id: 'all', label: 'الكل', active: true },
  { id: 'reports', label: 'تقارير' },
  { id: 'planning', label: 'تخطيط' },
  { id: 'analysis', label: 'تحليل' },
];

const templates: TemplateCard[] = [
  {
    id: 'annual-analysis',
    name: 'تحليل البيانات السنوي',
    description: 'آخر تعديل: أحمد سعد - قبل 3 أيام',
    tag: 'تحليل',
    accent: 'from-cyan-400/40 via-blue-400/20 to-slate-100/70',
  },
  {
    id: 'engineering-plan',
    name: 'خطة المشاريع الهندسية',
    description: 'آخر تعديل: ريما أنس - قبل يومين',
    tag: 'تخطيط',
    accent: 'from-emerald-400/40 via-teal-300/25 to-slate-100/70',
  },
  {
    id: 'quarterly-finance',
    name: 'التقرير المالي الفصلي',
    description: 'آخر تعديل: خالد فهد - اليوم',
    tag: 'تقرير',
    accent: 'from-amber-300/40 via-orange-300/20 to-slate-100/70',
  },
];

const availableElements = [
  { id: 'text', label: 'عنوان نصي', icon: 'Tr' },
  { id: 'chart', label: 'رسم بياني', icon: '▮▮' },
  { id: 'table', label: 'جدول بيانات', icon: '▦' },
  { id: 'media', label: 'صورة / وسائط', icon: '◫' },
  { id: 'time', label: 'نطاق زمني', icon: '◷' },
];

export default function SuperAdminTemplatesPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#050A19] text-white">
      <div className="mx-auto max-w-[1440px] p-3 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          <SuperAdminSidebar />

          <section className="flex-1 rounded-3xl border border-[#1A2A4A] bg-[#080F23] p-4 md:p-6">
            <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-black text-white">مكتبة القوالب العالمية</h1>
                <p className="mt-1 text-sm text-slate-400">قم بإدارة وتخصيص قوالب النظام الموحدة لمشاريعك</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
                >
                  <span className="text-base leading-none">+</span>
                  إنشاء قالب جديد
                </button>
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
                  className="rounded-xl border border-[#1A2A4A] bg-[#0D1632] p-2.5 text-slate-300 transition hover:bg-[#111D3F]"
                  aria-label="الإشعارات"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
            </header>

            <section className="mb-5 flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    category.active
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'border border-[#1A2A4A] bg-[#0D1632] text-slate-300 hover:bg-[#132042]'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </section>

            <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
              <article className="rounded-2xl border border-dashed border-[#2C406E] bg-[#0B1430] p-4">
                <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-[#2C406E] bg-[#0A132C] text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-blue-300">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-white">قالب جديد</p>
                  <p className="mt-1 text-xs text-slate-500">ابدأ من صفحة فارغة</p>
                </div>
              </article>

              {templates.map((template) => (
                <article key={template.id} className="rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-3 transition hover:border-blue-500/40">
                  <div className={`relative h-44 overflow-hidden rounded-xl bg-gradient-to-br ${template.accent}`}>
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0_22%,rgba(15,23,42,0.11)_22%_24%,transparent_24%_42%,rgba(15,23,42,0.11)_42%_44%,transparent_44%_62%,rgba(15,23,42,0.11)_62%_64%,transparent_64%)]" />
                    <div className="absolute left-3 top-3 rounded-md bg-[#0B1430]/85 px-2 py-1 text-[10px] font-bold text-slate-200">معاينة</div>
                  </div>

                  <div className="mt-3 flex items-start justify-between gap-2">
                    <div>
                      <p className="text-lg font-black text-white">{template.name}</p>
                      <p className="mt-1 text-xs text-slate-400">{template.description}</p>
                    </div>
                    <span className="rounded-md bg-[#122041] px-2 py-1 text-[10px] font-bold text-slate-300">{template.tag}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500">
                      <button type="button" className="rounded-md bg-[#0A132C] p-1.5 transition hover:bg-[#17274A]" aria-label="إخفاء">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18M10.6 10.6A3 3 0 0015 15M9.9 5.6A10.7 10.7 0 0121 12c-1.5 3-4.8 6-9 6a9.8 9.8 0 01-4.3-1M6.2 6.2C4.5 7.6 3.3 9.3 3 12c.5 1 1.2 2 2 2.9" />
                        </svg>
                      </button>
                      <button type="button" className="rounded-md bg-[#0A132C] p-1.5 transition hover:bg-[#17274A]" aria-label="نسخ">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8a2 2 0 012 2v8M6 17h8a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <button type="button" className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-blue-500">
                      تعديل
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <section className="mt-6">
              <div className="mb-3 flex items-center gap-2">
                <button type="button" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-500">
                  حفظ القالب
                </button>
                <button type="button" className="rounded-lg border border-[#1A2A4A] bg-[#0D1632] px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-[#15264A]">
                  معاينة
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">
                <article className="min-h-[350px] rounded-2xl border border-dashed border-[#2C406E] bg-[#0B1430] p-6">
                  <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 text-blue-300">
                      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4V4zm4 4h8v8H8V8z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-black text-white">منطقة التصميم</h3>
                    <p className="mt-2 text-sm text-slate-400">اسحب العناصر من القائمة الجانبية وافلتها هنا لبناء التصميم</p>
                    <button type="button" className="mt-6 rounded-lg bg-[#132446] px-5 py-2.5 text-xs font-bold text-blue-300 transition hover:bg-[#1A305A]">
                      تحميل تصميم جاهز (JSON)
                    </button>
                  </div>
                </article>

                <article className="rounded-2xl border border-[#1A2A4A] bg-[#0D1632] p-4">
                  <h3 className="mb-3 text-lg font-black text-white">العناصر المتاحة</h3>
                  <div className="space-y-2">
                    {availableElements.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl border border-[#1A2A4A] bg-[#0A132C] px-3 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500/40 hover:bg-[#122041]"
                      >
                        <span>{item.label}</span>
                        <span className="rounded-md bg-[#14264B] px-2 py-1 text-xs text-blue-300">{item.icon}</span>
                      </button>
                    ))}
                  </div>
                </article>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}
