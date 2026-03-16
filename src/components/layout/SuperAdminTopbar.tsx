'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const pageLabels: Array<{ href: string; label: string }> = [
  { href: '/super-admin/notifications', label: 'الإشعارات' },
  { href: '/super-admin/integrations', label: 'التكاملات' },
  { href: '/super-admin/reports', label: 'التقارير' },
  { href: '/super-admin/ai', label: 'التحليلات والذكاء الاصطناعي' },
  { href: '/super-admin/templates', label: 'إدارة القوالب' },
  { href: '/super-admin/plans', label: 'الشؤون المالية' },
  { href: '/super-admin/users-teams', label: 'المستخدمون / الفرق' },
  { href: '/super-admin', label: 'نظرة عامة' },
];

function getPageLabel(pathname: string): string {
  const matched = pageLabels.find((item) => pathname.startsWith(item.href));
  return matched ? matched.label : 'لوحة التحكم';
}

export function SuperAdminTopbar() {
  const pathname = usePathname();
  const pageLabel = getPageLabel(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-[#1A2A4A] dark:bg-[#050A19]/95">
      <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-3 py-3 md:px-5 md:py-4">
        <button
          type="button"
          aria-label="الملف الشخصي"
          className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-slate-700 transition hover:bg-slate-100 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-slate-200 dark:hover:bg-[#142247]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-xs font-black text-white">
            أ
          </span>
          <span className="hidden text-sm font-bold lg:block">أحمد الإداري</span>
        </button>

        <div className="relative min-w-0 flex-1">
          <input
            type="text"
            placeholder={`بحث داخل ${pageLabel}...`}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-10 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500/60 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-slate-200 dark:placeholder:text-slate-500"
          />
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z" />
          </svg>
        </div>

        <Link
          href="/super-admin/notifications"
          aria-label="الإشعارات"
          className="relative shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-[#1A2A4A] dark:bg-[#0D1632] dark:text-slate-300 dark:hover:bg-[#142247] group"
        >
          <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white animate-pulse">
            3
          </span>
        </Link>

        <ThemeToggle />

        <Link
          href="/login"
          prefetch={true}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-500/20 dark:text-rose-100"
          aria-label="تسجيل الخروج"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 17l-5-5m0 0l5-5m-5 5h12M19 20H9a2 2 0 01-2-2" />
          </svg>
          <span className="hidden sm:inline">تسجيل الخروج</span>
        </Link>
      </div>
    </header>
  );
}
