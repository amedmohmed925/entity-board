'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type MouseEvent, useEffect, useState } from 'react';
import { BrandLogoIcon } from '@/components/ui/BrandLogoIcon';

type SidebarItem = {
  id: string;
  label: string;
  href?: string;
};

const sidebarItems: SidebarItem[] = [
  { id: 'overview', label: 'نظرة عامة', href: '/super-admin' },
  { id: 'users-teams', label: 'المستخدمون / الفرق', href: '/super-admin/users-teams' },
  { id: 'plans', label: 'الشؤون المالية', href: '/super-admin/plans' },
  { id: 'templates', label: 'إدارة القوالب', href: '/super-admin/templates' },
  { id: 'ai', label: 'التحليلات والذكاء الاصطناعي', href: '/super-admin/ai' },
  { id: 'reports', label: 'التقارير', href: '/super-admin/reports' },
  { id: 'integrations', label: 'التكاملات', href: '/super-admin/integrations' },
];

function RouteTransitionOverlay() {
  return (
    <div className="fixed inset-0 z-[70] bg-slate-100/88 dark:bg-[#050A19]/92 backdrop-blur-[1px]">
      <div className="mx-auto max-w-[1440px] px-3 pt-[94px] md:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <aside className="hidden w-72 shrink-0 rounded-3xl border border-slate-200/80 bg-white/90 p-4 dark:border-[#1A2A4A] dark:bg-[#0A1126] lg:block">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="sa-skeleton h-9 w-9 rounded-xl" />
                <div className="space-y-2">
                  <div className="sa-skeleton h-3 w-20 rounded-md" />
                  <div className="sa-skeleton h-2.5 w-16 rounded-md" />
                </div>
              </div>
              <div className="sa-skeleton h-8 w-8 rounded-lg" />
            </div>

            <div className="space-y-2">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="sa-skeleton h-11 rounded-xl" />
              ))}
            </div>
          </aside>

          <section className="min-w-0 flex-1 rounded-3xl border border-slate-200/80 bg-white/90 p-4 dark:border-[#1A2A4A] dark:bg-[#080F23] md:p-6">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <div className="sa-skeleton h-9 w-64 rounded-xl md:w-80" />
                <div className="sa-skeleton h-4 w-[22rem] max-w-full rounded-lg" />
              </div>
              <div className="flex items-center gap-2">
                <div className="sa-skeleton h-10 w-36 rounded-xl" />
                <div className="sa-skeleton h-10 w-24 rounded-xl" />
              </div>
            </div>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <article key={index} className="rounded-2xl border border-slate-200/80 bg-slate-100/70 p-4 dark:border-[#1A2A4A] dark:bg-[#0D1632]">
                  <div className="sa-skeleton h-3 w-24 rounded-md" />
                  <div className="sa-skeleton mt-3 h-9 w-24 rounded-lg" />
                  <div className="sa-skeleton mt-3 h-3 w-20 rounded-md" />
                </article>
              ))}
            </section>

            <article className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-100/70 p-4 dark:border-[#1A2A4A] dark:bg-[#0D1632]">
              <div className="sa-skeleton h-10 w-full rounded-xl" />
              <div className="mt-4 space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="grid grid-cols-6 gap-3">
                    <div className="sa-skeleton col-span-2 h-8 rounded-lg" />
                    <div className="sa-skeleton h-8 rounded-lg" />
                    <div className="sa-skeleton h-8 rounded-lg" />
                    <div className="sa-skeleton h-8 rounded-lg" />
                    <div className="sa-skeleton h-8 rounded-lg" />
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}

export function SuperAdminSidebar() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === pathname) {
      return;
    }

    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    setIsNavigating(true);
  };

  return (
    <>
      <aside className="w-full shrink-0 rounded-3xl border border-slate-200/80 bg-white/90 p-4 dark:border-[#1A2A4A] dark:bg-[#0A1126] lg:w-72">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogoIcon className="h-9 w-9" />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">لوحة كيان</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Super Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <button className="rounded-lg bg-slate-100 p-2 transition hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10" aria-label="الإعدادات" type="button">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11.983 13.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19.4 15a1 1 0 00.2 1.1l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1 1 0 00-1.1-.2 1 1 0 00-.6.9V20a2 2 0 11-4 0v-.2a1 1 0 00-.6-.9 1 1 0 00-1.1.2l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1 1 0 00.2-1.1 1 1 0 00-.9-.6H4a2 2 0 110-4h.2a1 1 0 00.9-.6 1 1 0 00-.2-1.1l-.1-.1a2 2 0 012.8-2.8l.1.1a1 1 0 001.1.2 1 1 0 00.6-.9V4a2 2 0 114 0v.2a1 1 0 00.6.9 1 1 0 001.1-.2l.1-.1a2 2 0 112.8 2.8l-.1.1a1 1 0 00-.2 1.1 1 1 0 00.9.6H20a2 2 0 110 4h-.2a1 1 0 00-.9.6z" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = item.href
              ? item.href === '/super-admin'
                ? pathname === item.href
                : pathname.startsWith(item.href)
              : false;

            if (!item.href) {
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled
                  className="group flex w-full cursor-not-allowed items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 dark:text-slate-500"
                >
                  <span>{item.label}</span>
                  <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-700" />
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                prefetch
                onClick={(event) => handleNavClick(event, item.href as string)}
                className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-white' : 'bg-slate-300 group-hover:bg-slate-500 dark:bg-slate-600 dark:group-hover:bg-slate-400'}`} />
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-100/70 p-4 dark:border-[#1A2A4A] dark:bg-[#0D1632]">
          <p className="text-xs text-slate-500 dark:text-slate-400">المستخدم الحالي</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-violet-500" />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">أحمد الإداري</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {isNavigating && <RouteTransitionOverlay />}
    </>
  );
}
