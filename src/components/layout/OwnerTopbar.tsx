'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const pageLabels: Array<{ href: string; label: string; exact?: boolean }> = [
  { href: '/owner/team', label: 'إدارة الفريق' },
  { href: '/owner/billing', label: 'الاشتراكات والفواتير' },
  { href: '/owner/settings', label: 'إعدادات الشركة' },
  { href: '/owner/library', label: 'مكتبة اللوحات' },
  { href: '/owner/analytics', label: 'التحليلات المتقدمة' },
  { href: '/owner/financials', label: 'التقارير المالية' },
  { href: '/owner/account', label: 'إعدادات الحساب' },
  { href: '/owner/help', label: 'مركز المساعدة' },
  { href: '/analyst/prep', label: 'تجهيز البيانات' },
  { href: '/analyst/builder', label: 'بناء اللوحات' },
  { href: '/analyst/ai-builder', label: 'الذكاء الاصطناعي' },
  { href: '/analyst/chat', label: 'التحدث مع البيانات' },
  { href: '/analyst/collab', label: 'التعاون' },
  { href: '/analyst/reports', label: 'التقارير والتصدير' },
  { href: '/analyst', label: 'مصادر البيانات', exact: true },
  { href: '/developer/api-keys', label: 'مفاتيح الـ API' },
  { href: '/developer/webhooks', label: 'الويبهوك' },
  { href: '/developer/logs', label: 'سجل النشاط' },
  { href: '/developer/docs', label: 'التوثيق التقني' },
  { href: '/developer', label: 'مركز المطورين', exact: true },
  { href: '/owner', label: 'لوحة القيادة التنفيذية', exact: true },
];

function getPageLabel(pathname: string): string {
  const matched = pageLabels.find((item) => item.exact ? pathname === item.href : pathname.startsWith(item.href));
  return matched ? matched.label : 'إدارة النظام';
}

export function OwnerTopbar() {
  const pathname = usePathname();
  const pageLabel = getPageLabel(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 dark:border-[#1A2A4A] bg-white/95 dark:bg-[#050A19]/95 backdrop-blur-md text-slate-900 dark:text-white transition-colors duration-300">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-3 py-3 md:px-5 md:py-4">
        
        {/* User Profile Area */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="الملف الشخصي للمدير"
            className="flex shrink-0 items-center gap-3 rounded-full border border-slate-200 dark:border-[#1A2A4A] bg-slate-50 dark:bg-[#0D1632] pl-4 pr-1.5 py-1.5 transition hover:bg-slate-100 dark:hover:bg-[#142247]"
          >
            <div className="h-9 w-9 overflow-hidden rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
               أ
            </div>
            <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-slate-900 dark:text-white">أحمد المدير</p>
               <p className="text-[10px] text-blue-500">صاحب العمل</p>
            </div>
          </button>

          <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition" aria-label="إعدادات الحساب">
             <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
          </button>
        </div>

        {/* Center: Dashboard Name */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
            <h1 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                {pageLabel}
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-500 border border-blue-500/30">Executive Mode</span>
            </h1>
        </div>

        {/* Left Side Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          <div className="relative hidden w-64 md:block">
            <input
              type="text"
              placeholder="البحث في النظام..."
              className="w-full rounded-full border border-slate-200 dark:border-[#1A2A4A] bg-slate-50 dark:bg-[#0A1126] px-10 py-2 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
            />
            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z" />
            </svg>
          </div>

          <button
            type="button"
            aria-label="تنبيهات الإدارة"
            className="relative shrink-0 rounded-full border border-slate-200 dark:border-[#1A2A4A] bg-slate-50 dark:bg-[#0A1126] p-2 text-slate-500 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-[#142247] hover:text-slate-900 dark:hover:text-white group"
          >
            <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-blue-500 border-2 border-white dark:border-[#0A1126]" />
          </button>

          {/* Spacer Line */}
          <div className="h-6 w-px bg-slate-200 dark:bg-[#1A2A4A]" />

          <div className="relative shrink-0 rounded-full border border-slate-200 dark:border-[#1A2A4A] bg-slate-50 dark:bg-[#0D1632] p-1.5 text-slate-500 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-[#142247] hover:text-slate-900 dark:hover:text-white group flex items-center justify-center">
             <ThemeToggle />
          </div>

          <Link
            href="/login"
            prefetch={true}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-rose-500/10 dark:bg-white/5 p-2 text-rose-500 dark:text-rose-400 transition hover:bg-rose-500/20 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-300"
            aria-label="تسجيل الخروج"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
