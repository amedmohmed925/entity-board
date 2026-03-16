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
    id: 'overview', 
    label: 'نظرة عامة', 
    href: '/owner',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    id: 'team', 
    label: 'إدارة الفريق', 
    href: '/owner/team',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  { 
    id: 'billing', 
    label: 'الاشتراكات والفواتير', 
    href: '/owner/billing',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2-2V19a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    id: 'settings', 
    label: 'إعدادات الشركة والهوية', 
    href: '/owner/settings',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  { 
    id: 'library', 
    label: 'مكتبة اللوحات', 
    href: '/owner/library',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )
  },
  { 
    id: 'analytics', 
    label: 'التحليلات المتقدمة', 
    href: '/owner/analytics',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    id: 'financials', 
    label: 'التقارير المالية', 
    href: '/owner/financials',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-12c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2s-2-.9-2-2V7c0-1.1.9-2 2-2m0 0V3m0 18v-2" />
      </svg>
    )
  },
  { 
    id: 'account-settings', 
    label: 'إعدادات الحساب', 
    href: '/owner/account',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  { 
    id: 'help', 
    label: 'مركز المساعدة', 
    href: '/owner/help',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
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

export function OwnerSidebar() {
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
            <BrandLogoIcon className="h-9 w-9 text-blue-600 shrink-0" />
            {!isCollapsed && (
              <div className="whitespace-nowrap">
                <p className="text-sm font-bold text-slate-900 dark:text-white">إدارة كيان بورد</p>
                <p className="text-[11px] text-blue-600 dark:text-blue-500">منصة التحكم التنفيذية</p>
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
            const isActive = item.href === '/owner' 
              ? pathname === '/owner' 
              : pathname.startsWith(item.href || '');

            return (
              <Link
                key={item.id}
                href={item.href || '#'}
                prefetch
                onClick={(event) => item.href && handleNavClick(event, item.href)}
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
                    منطقة الإدارة مؤمنة وتخضع لسياسات الخصوصية والأمان العالمية.
                </p>
                <button className="mt-3 w-full py-2 bg-white dark:bg-white/10 text-slate-900 dark:text-white text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-white/20 transition shadow-sm border border-slate-200 dark:border-transparent">
                    عرض تقرير الامتثال
                </button>
            </div>
        )}
      </aside>

      {isNavigating && <RouteTransitionOverlay />}
    </>
  );
}
