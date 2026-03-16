'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type MouseEvent, useEffect, useState } from 'react';
import { BrandLogoIcon } from '@/components/ui/BrandLogoIcon';

type SidebarItem = {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  { 
    id: 'connectors', 
    label: 'مصادر البيانات', 
    href: '/analyst',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  },
  { 
    id: 'data-prep', 
    label: 'معاينة وتجهيز البيانات', 
    href: '/analyst/prep',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  { 
    id: 'dashboard-builder', 
    label: 'بناء اللوحات', 
    href: '/analyst/builder',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z" />
      </svg>
    )
  },
  {
    id: 'ai-builder',
    label: 'توليد اللوحات بالذكاء الاصطناعي',
    href: '/analyst/ai-builder',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'chat',
    label: 'التحدث مع البيانات',
    href: '/analyst/chat',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )
  },
  {
    id: 'collab',
    label: 'التعاون والمشاركة',
    href: '/analyst/collab',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 'reports',
    label: 'التقارير والتصدير',
    href: '/analyst/reports',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];

function RouteTransitionOverlay() {
  return (
    <div className="fixed inset-0 top-[72px] lg:top-[88px] z-30 bg-slate-900/20 dark:bg-[#050A19]/50 backdrop-blur-sm flex items-center justify-center">
       <div className="flex items-center gap-4 bg-white dark:bg-[#0D1632] px-6 py-4 rounded-2xl border border-slate-200 dark:border-[#1A2A4A] shadow-2xl">
          <svg className="w-6 h-6 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-bold text-slate-900 dark:text-white">جاري تحميل المساحة...</span>
       </div>
    </div>
  );
}

export function AnalystSidebar() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
      <aside 
         className={`hidden lg:flex flex-col shrink-0 border-l border-slate-200 dark:border-[#1A2A4A] bg-white dark:bg-[#0A1126] h-[calc(100vh-88px)] sticky top-[88px] overflow-y-auto overflow-x-hidden z-40 transition-all duration-300 ${
            isCollapsed ? 'w-24 px-3 py-6 items-center' : 'w-72 p-4'
         }`}
      >
        <div className={`mb-8 flex w-full transition-all duration-300 ${isCollapsed ? 'flex-col items-center gap-6' : 'items-center justify-between'}`}>
          <div className="flex items-center gap-3">
            <BrandLogoIcon className="h-9 w-9 text-blue-500 shrink-0" />
            {!isCollapsed && (
              <div className="whitespace-nowrap">
                <p className="text-sm font-bold text-slate-900 dark:text-white">لوحة العمليات</p>
                <p className="text-[11px] text-blue-500 dark:text-blue-400">تحليل البيانات</p>
              </div>
            )}
          </div>
          
          <button 
             onClick={() => setIsCollapsed(!isCollapsed)}
             className={`rounded-lg p-2 transition hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:hover:text-white dark:text-slate-400 shrink-0 flex items-center justify-center ${isCollapsed ? 'bg-slate-50 dark:bg-white/5' : ''}`}
             title={isCollapsed ? 'توسيع القائمة' : 'طي القائمة'}
          >
             <svg className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180 text-slate-900 dark:text-white' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M4 5l7 7-7 7" />
             </svg>
          </button>
        </div>

        <nav className="space-y-2 flex-1 w-full flex flex-col items-center">
          {sidebarItems.map((item) => {
            const isActive = item.href === '/analyst' 
              ? pathname === '/analyst' 
              : pathname.startsWith(item.href || '');

            if (!item.href) {
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled
                  className={`group w-full cursor-not-allowed rounded-xl p-3 text-sm font-semibold text-slate-400 dark:text-slate-500 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className="shrink-0 flex items-center justify-center">{item.icon}</div>
                  {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                prefetch
                onClick={(event) => handleNavClick(event, item.href as string)}
                className={`group w-full flex items-center rounded-xl p-3 text-sm font-semibold transition ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="shrink-0 flex items-center justify-center">{item.icon}</div>
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                {!isCollapsed && isActive && (
                  <svg className="h-4 w-4 mr-auto text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                )}
              </Link>
            );
          })}
        </nav>

        {!isCollapsed && (
            <div className="mt-8 rounded-2xl border border-slate-200 dark:border-[#1A2A4A] bg-slate-50 dark:bg-[#0D1632] p-4 text-center shrink-0">
                <svg className="h-6 w-6 mx-auto mb-2 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed whitespace-normal">
                    استخدمنا تقنية التشفير من طرف لطرف لتأمين بياناتك المتصلة.
                </p>
                <button className="mt-3 w-full py-2 bg-white dark:bg-white/10 text-slate-900 dark:text-white text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-white/20 transition shadow-sm border border-slate-200 dark:border-transparent">
                    إدارة الأذونات
                </button>
            </div>
        )}
      </aside>

      {isNavigating && <RouteTransitionOverlay />}
    </>
  );
}
