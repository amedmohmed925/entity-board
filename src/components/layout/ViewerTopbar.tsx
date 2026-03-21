'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const pageLabels: Array<{ href: string; label: string; exact?: boolean }> = [
  { href: '/viewer/dashboards', label: 'لوحات البيانات' },
  { href: '/viewer/reports', label: 'التقارير' },
  { href: '/viewer/help', label: 'المساعدة' },
  { href: '/viewer', label: 'نظرة عامة', exact: true },
];

function getPageLabel(pathname: string): string {
  const matched = pageLabels.find((item) => item.exact ? pathname === item.href : pathname.startsWith(item.href));
  return matched ? matched.label : 'وضع المشاهدة';
}

export function ViewerTopbar() {
  const pathname = usePathname();
  const pageLabel = getPageLabel(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 dark:border-[#1A2A4A] bg-white/95 dark:bg-[#050A19]/95 backdrop-blur-md text-slate-900 dark:text-white transition-colors duration-300">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-3 py-3 md:px-5 md:py-4">
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex shrink-0 items-center gap-3 rounded-full border border-slate-200 dark:border-[#1A2A4A] bg-slate-50 dark:bg-[#0D1632] pl-4 pr-1.5 py-1.5 transition"
          >
            <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-500 flex items-center justify-center text-white font-bold">
               م
            </div>
            <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-slate-900 dark:text-white">مستخدم مشاهد</p>
               <p className="text-[10px] text-slate-500">مشاهد فقط</p>
            </div>
          </button>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
            <h1 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                {pageLabel}
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/20 text-slate-500 border border-slate-500/30">View Only</span>
            </h1>
        </div>

        <div className="flex items-center gap-3 w-full lg:auto justify-end">
          <div className="relative shrink-0 rounded-full border border-slate-200 dark:border-[#1A2A4A] bg-slate-50 dark:bg-[#0D1632] p-1.5 text-slate-500 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-[#142247] hover:text-slate-900 dark:hover:text-white group flex items-center justify-center">
             <ThemeToggle />
          </div>

          <Link
            href="/login"
            prefetch={true}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-rose-500/10 dark:bg-white/5 p-2 text-rose-500 dark:text-rose-400 transition hover:bg-rose-500/20 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-300"
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
